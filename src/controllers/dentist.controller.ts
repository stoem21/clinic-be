import { Like } from "typeorm";
import dataSource from "../dbConfig/dataSource";
import { DentistEntity } from "../entity/dentist.entity";
import { Request, Response } from "express";

const dentistRepository = dataSource.getRepository(DentistEntity);

const createDentist = async (req: Request, res: Response) => {
  const {
    name,
    phoneNumber,
    email,
    lineId,
    note,
    dentistLicensId,
    isOrthoDentist,
  } = req.body;
  const isAlreadyHave = await dentistRepository.findOne({
    where: { dentistLicensId: dentistLicensId, active: true },
  });
  if (isAlreadyHave) {
    return res.status(400).json({ message: "Already have this licens ID" });
  }
  const dent = new DentistEntity();
  dent.name = name;
  dent.dentistLicensId = dentistLicensId; // validate length
  dent.phoneNumber = phoneNumber; // validate lenth
  dent.email = email || null;
  dent.lineId = lineId || null;
  dent.note = note || null;
  dent.isOrthoDentist = Boolean(isOrthoDentist);

  const savedDent = await dentistRepository.save(dent);
  return res
    .status(200)
    .json({ message: "Dentist created successfully", data: savedDent });
};
const getDentist = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!parseInt(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }
  const dent = await dentistRepository.findOne({
    where: { id: parseInt(id), active: true },
  });
  if (!dent) {
    return res.status(400).json({ message: "Dentist not found" });
  }
  return res.status(200).json({ data: dent });
};
const getDentists = async (req: Request, res: Response) => {
  const { dentistLicensId, isActive, forDropdown, isOrthoDentist } = req.query;
  // add type of the query !!!
  const buildWhereCause = {};
  if (dentistLicensId) {
    buildWhereCause["dentistLicensId"] = Like(`%${dentistLicensId as string}%`); //check
  }
  if (isActive !== undefined) {
    buildWhereCause["active"] = isActive === "true" ? true : false;
  }
  if (isOrthoDentist !== undefined) {
    buildWhereCause["isOrthoDentist"] =
      isOrthoDentist === "true" ? true : false;
  }
  const dents = await dentistRepository.find({
    where: buildWhereCause,
    order: { dentistLicensId: "ASC" },
  });
  if (forDropdown) {
    return res.status(200).json({
      data: dents.map((dent) => {
        return {
          label: `${dent.name} ${dent.dentistLicensId}`,
          value: dent.id,
        };
      }),
    });
  }
  return res.status(200).json({
    data: dents,
  });
};
const updateDentist = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!parseInt(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }
  const {
    name,
    phoneNumber,
    email,
    lineId,
    note,
    dentistLicensId,
    isOrthoDentist,
  } = req.body;
  const dent = await dentistRepository.findOne({ where: { id: parseInt(id) } });
  if (!dent) {
    return res.status(400).json({ message: "Dentist not found" });
  }
  dent.name = name;
  dent.dentistLicensId = dentistLicensId;
  dent.phoneNumber = phoneNumber;
  dent.email = email || null;
  dent.lineId = lineId || null;
  dent.note = note || null;
  dent.isOrthoDentist = Boolean(isOrthoDentist);
  const savedDent = await dentistRepository.save(dent);
  return res
    .status(200)
    .json({ message: "Dentist updated successfully", data: savedDent });
};
const deleteDentist = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!parseInt(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }
  const dent = await dentistRepository.findOne({ where: { id: parseInt(id) } });
  if (!dent) {
    return res.status(400).json({ message: "Dentist not found" });
  }
  if (dent.active === false) {
    return res.status(400).json({ message: "Dentist already deleted" });
  }
  dent.active = false;
  await dentistRepository.save(dent);
  return res.status(200).json({ message: "deleted" });
};

const activateDentist = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!parseInt(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }
  const dent = await dentistRepository.findOne({
    where: { id: parseInt(id) },
  });
  if (!dent) {
    return res.status(400).json({ message: "Dentist not found" });
  }
  if (dent.active) {
    return res.status(400).json({ message: "Dentist already activated" });
  }
  dent.active = true;
  await dentistRepository.save(dent);
  return res.status(200).json({ message: "activated" });
};

export const DentistController = {
  createDentist,
  getDentist,
  getDentists,
  updateDentist,
  deleteDentist,
  activateDentist,
};
