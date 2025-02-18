import dataSource from "../dbConfig/dataSource";
import { DentistEntity } from "../entity/dentist.entity";
import { Request, Response } from "express";
import { ClientProfileEntity } from "../entity/client-profile.entity";
import { UserEntity } from "../entity/users.entity";
import { TreatmentRecordEntity } from "../entity/treatment-record.entity";
import { TreatmentTypeEntity } from "../entity/treatment-type.entity";
import { TreatmentRecordItemEntity } from "../entity/treatment-record-item.entity";
import {
  CreateTreatmentRequest,
  UpdateTreatmentRequest,
} from "../dto/treatment.dto";
import { DEFAULT_PAGE_SIZE } from "../utils/helpers";
import { Between, In, LessThanOrEqual, MoreThanOrEqual } from "typeorm";

const dentistRepo = dataSource.getRepository(DentistEntity);
const clientProfileRepo = dataSource.getRepository(ClientProfileEntity);
const treatmentRecordRepo = dataSource.getRepository(TreatmentRecordEntity);
const treatmentRecordItemRepo = dataSource.getRepository(
  TreatmentRecordItemEntity
);
const treatmentTypeRepo = dataSource.getRepository(TreatmentTypeEntity);

const validateRecord = async (
  body: CreateTreatmentRequest | UpdateTreatmentRequest,
  res: Response
) => {
  if (!new Date(body.treatmentDate)) {
    return res.status(400).json({ message: "Date incorrect format" });
  }
  const isHaveHN = await clientProfileRepo.findOne({
    where: { hn: body.clientHN },
  });
  if (!isHaveHN) {
    return res.status(400).json({ message: "Invalid HN" });
  }
  const isHaveDent = await dentistRepo.findOne({
    where: { id: parseInt(body.dentistId) },
  });
  if (!isHaveDent) {
    return res.status(400).json({ message: "Invalid dentist id" });
  }
  // validate treatmentItems
  // const listTreatmentType = (
  //   await treatmentTypeRepo.find({ select: ["key"] })
  // ).map((entity) => entity.key);

  // const isTypeValid = body.treatmentItems.every((item) =>
  //   listTreatmentType.includes(item.treatmentKey)
  // );
  // if (!isTypeValid) {
  //   return res.status(400).json({ message: "Invalid treatment type" });
  // }
  return null;
};

const createTreatmentRecord = async (req: Request, res: Response) => {
  const recordData = req.body;
  const isNotPass = await validateRecord(recordData, res);
  const user = (req as any).currentUser;
  console.log("user", user);
  if (isNotPass) return isNotPass;
  const treatmentRecord = new TreatmentRecordEntity();
  treatmentRecord.clientHN = recordData.clientHN;
  treatmentRecord.note = recordData.note || null;
  treatmentRecord.dentistId = recordData.dentistId;
  treatmentRecord.treatmentDate = new Date(recordData.treatmentDate);
  treatmentRecord.createdAt = new Date();
  treatmentRecord.updatedAt = new Date();
  treatmentRecord.createdBy = user.id;
  treatmentRecord.updatedBy = user.id;

  const savedRecord = await treatmentRecordRepo.save(treatmentRecord);
  const saveList: TreatmentRecordItemEntity[] = [];
  recordData.treatmentItems.forEach((item) => {
    const treatmentItem = new TreatmentRecordItemEntity();
    treatmentItem.treatmentRecordId = savedRecord.id;
    treatmentItem.treatmentValue = item.data;
    treatmentItem.treatmentType = item.type;
    saveList.push(treatmentItem);
  });

  const savedRecordItem = await treatmentRecordItemRepo.save(saveList);
  return res.status(200).json({
    message: "Treatment record created successfully",
    data: { ...savedRecord, items: savedRecordItem },
  });
};
const updateTreatmentRecord = async (req: Request, res: Response) => {
  // accept only edit row cant add new row and cant change type
  // why => if can add new role or delete row will have problem when recheck and
  const { id } = req.params;
  const record = await treatmentRecordRepo.findOne({
    where: { id },
    relations: { treatmentItems: true },
  });
  console.log("===========record===========");
  console.log(record);
  const user = (req as any).currentUser;
  if (!record) return res.status(400).json({ message: "Invalid record id" });
  const updateData = req.body as UpdateTreatmentRequest;
  console.log("===========updateData===========");
  console.log(updateData);
  const isNotPass = await validateRecord(updateData, res);
  if (isNotPass) return isNotPass;
  // validate record item
  // if (
  //   !updatedRecordItemsIdList.every((item) =>
  //     oldRecordItemsIdList.includes(item)
  //   )
  // ) {
  //   return res.status(400).json({ message: "Invalid record item id" });
  // }

  record.clientHN = updateData.clientHN;
  record.note = updateData.note;
  record.dentistId = updateData.dentistId;
  record.treatmentDate = new Date(updateData.treatmentDate);
  const savedRecord = await treatmentRecordRepo.save(record);
  // const deleteList: TreatmentRecordItemEntity[] = [];
  const updateList: TreatmentRecordItemEntity[] = [];
  const addList: TreatmentRecordItemEntity[] = [];
  updateData.treatmentItems.forEach((item) => {
    const data = record.treatmentItems.find(
      (recordItem) => recordItem.id == item.id
    );
    if (data) {
      data.treatmentValue = item.data;
      data.treatmentType = item.type;
      data.updatedAt = new Date();
      updateList.push(data);
    } else {
      //add
      const treatmentItem = new TreatmentRecordItemEntity();
      treatmentItem.treatmentRecordId = record.id;
      treatmentItem.treatmentValue = item.data;
      treatmentItem.treatmentType = item.type;
      treatmentItem.updatedAt = new Date();
      treatmentItem.createdAt = new Date();
      addList.push(treatmentItem);
    }
  });
  // delete
  const deleteList = record.treatmentItems.filter(
    (item) =>
      !updateData.treatmentItems.some((updateItem) => updateItem.id === item.id)
  );
  const updateRecord = await treatmentRecordItemRepo.save(updateList);
  const addRecord = await treatmentRecordItemRepo.save(addList);
  // const deleteRecord = await treatmentRecordItemRepo.remove(deleteList);
  const deleteRecord = await treatmentRecordItemRepo.softDelete(
    deleteList.map((entity) => entity.id)
  );

  return res.status(200).json({
    message: "Treatment record updated successfully",
    data: {},
    // data: { ...updatedRecord, items: updatedRecordItem },
  });
};
const getTreatmentRecord = async (req: Request, res: Response) => {
  const { id } = req.params;
  const record = await treatmentRecordRepo.findOne({
    where: { id },
  });
  if (!record) return res.status(400).json({ message: "Invalid record id" });
  const recordItems = await treatmentRecordItemRepo.find({
    where: { treatmentRecordId: id },
  });
  return res.status(200).json({ data: { ...record, items: recordItems } });
};
const getTreatmentRecords = async (req: Request, res: Response) => {
  // poc search by treatment key
  const { startDate, endDate } = req.query as Partial<{
    startDate: string;
    endDate: string;
  }>;
  const user = (req as any).currentUser;
  console.log("user", user);
  const limit = +(req.query.pageSize ?? DEFAULT_PAGE_SIZE);
  const offset = (+(req.query.page ?? "1") - 1) * limit;
  const buildWhereCause = {};
  ["hn", "dentistId"].forEach((key) => {
    if (req.query[key]) {
      buildWhereCause[key] = req.query[key];
    }
  });
  if (startDate && endDate) {
    buildWhereCause["treatmentDate"] = Between(
      new Date(startDate),
      new Date(endDate)
    );
  } else if (startDate) {
    buildWhereCause["treatmentDate"] = MoreThanOrEqual(new Date(startDate));
  } else if (endDate) {
    buildWhereCause["treatmentDate"] = LessThanOrEqual(new Date(endDate));
  }
  const [records, count] = await treatmentRecordRepo.findAndCount({
    where: buildWhereCause,
    order: { treatmentDate: "DESC" },
    ...(req.query.pagination === "false"
      ? {}
      : {
          take: limit,
          skip: offset,
        }),
    relations: ["clientProfile"],
  });
  return res.status(200).json({
    data: records,
    pagination: {
      pageSize: limit,
      page: req.query.page,
      total: count,
    },
  });
};

export const TreatmentRecordController = {
  createTreatmentRecord,
  updateTreatmentRecord,
  getTreatmentRecord,
  getTreatmentRecords,
};
