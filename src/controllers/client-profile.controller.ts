import dataSource from "../dbConfig/dataSource";
import { Address, ClientProfileEntity } from "../entity/client-profile.entity";
import { Request, Response } from "express";
import { CreateClientRequest } from "../dto/client-profile.dto";
import { DentistEntity } from "../entity/dentist.entity";
import { Like } from "typeorm";
import { DEFAULT_PAGE_SIZE } from "../utils/helpers";
import { TambonsEntity } from "../entity/tambons.entity";
import { AmphuresEntity } from "../entity/amphures.entity";
import { ProvincesEntity } from "../entity/provinces.entity";

const clientProfileRepository = dataSource.getRepository(ClientProfileEntity);
const dentistRepository = dataSource.getRepository(DentistEntity);
const provincesRepository = dataSource.getRepository(ProvincesEntity);
const tambonsRepository = dataSource.getRepository(TambonsEntity);
const amphuresRepository = dataSource.getRepository(AmphuresEntity);

const generateHn = async () => {
  const thisYear = new Date().getFullYear() + 543;
  const prefixHn = thisYear.toString().slice(2);
  const lastClient = await clientProfileRepository.find({
    where: { hn: Like(`${prefixHn}%`) },
    order: { hn: "DESC" },
    take: 1,
  });
  if (lastClient.length > 0) {
    return (parseInt(lastClient[0].hn) + 1).toString();
  } else {
    return `${prefixHn}0001`;
  }
};

interface ClientProfileResponse {
  birthday: string | null;
  createdAt: string | null;
  createdBy: string | null;
  drugAllergy: string | null;
  drugEat: string | null;
  firstName: string;
  gender: string;
  hn: string;
  lastName: string;
  medicalCondition: string | null;
  nameTitle: string;
  nationalId: string | null;
  orthoDentistId: number | null;
  phoneNumber: string;
  updatedAt: string | null;
  updatedBy: string | null;
  district: number;
  house: string;
  province: number;
  subDistrict: number;
  zipcode: number;
}

const createClientProfile = async (req: Request, res: Response) => {
  const {
    nameTitle,
    firstName,
    lastName,
    nationalId,
    phoneNumber,
    gender,
    // address,
    house,
    subDistrict,
    district,
    province,
    zipcode,
    birthday,
    medicalCondition,
    drugAllergy,
    drugEat,
    orthoDentistId,
  } = req.body as CreateClientRequest;
  const buildWhereCause = {};
  console.log("=================kkk=============", nationalId);
  const user = (req as any).currentUser;
  console.log(user);
  if (nationalId) {
    buildWhereCause["nationalId"] = nationalId;
  } else {
    // buildWhereCause["name"] = name; // adjust
  }
  const isAlreadyHave = await clientProfileRepository.findOne({
    where: buildWhereCause,
  });
  if (isAlreadyHave && Object.keys(buildWhereCause).length > 0) {
    return res.status(400).json({ message: "Already have client" });
  }

  // validate birthday
  if (birthday && new Date(birthday)) {
    return res.status(400).json({ message: "Birthday date incorrect format" });
  }
  // validate ortho id
  if (orthoDentistId) {
    const dent = await dentistRepository.find({
      where: { id: orthoDentistId, isOrthoDentist: true },
    });
    if (!dent) {
      return res.status(400).json({ message: "Invalid dentist id" });
    }
  }

  if (
    !(house && subDistrict && district && province && zipcode) &&
    !(!house && !subDistrict && !district && !province && !zipcode)
  ) {
    return res.status(400).json({ message: "Invalid address" });
  }

  if (house && subDistrict && district && province && zipcode) {
    // check address valid
    const provinceEntity = await provincesRepository.findOne({
      where: { id: province },
    });
    if (!provinceEntity) {
      // error invalid province code
      return res.status(400).json({ message: "Invalid province" });
    }
    const districtEntity = await amphuresRepository.findOne({
      where: { id: district, province_id: province },
    });
    if (!districtEntity) {
      // error invalid district code
      return res.status(400).json({ message: "Invalid district" });
    }
    const subDistrictEntity = await tambonsRepository.findOne({
      where: {
        id: subDistrict.id,
        amphure_id: district,
      },
    });
    if (!subDistrictEntity) {
      // error invalid sub district code
      return res.status(400).json({ message: "Invalid sub district" });
    }
  }

  const client = new ClientProfileEntity();
  client.hn = await generateHn();
  client.nameTitle = nameTitle;
  client.firstName = firstName.trim();
  client.lastName = lastName.trim();
  client.nationalId = nationalId?.trim() || null;
  client.phoneNumber = phoneNumber?.trim();
  client.gender = gender;
  client.address = house
    ? ({
        house,
        subDistrict: subDistrict?.id,
        district,
        province,
        zipcode,
      } as Address)
    : null;
  client.birthday = birthday ? new Date(birthday) : null;
  client.medicalCondition = medicalCondition || null;
  client.drugAllergy = drugAllergy || null;
  client.drugEat = drugEat || null;
  client.orthoDentistId = orthoDentistId?.toString() || null;
  client.createdBy = user.id;
  client.updatedBy = user.id;

  const savedClient = await clientProfileRepository.save(client);
  return res
    .status(200)
    .json({ message: "Client created successfully", data: savedClient });
};

const getClient = async (req: Request, res: Response) => {
  const { hn } = req.params;
  const client = await clientProfileRepository.findOne({
    where: { hn },
  });
  if (!client) {
    return res.status(400).json({ message: "Invalid HN" });
  }
  // adjust this part
  const { address, ...data } = client;
  const adjustedData: Partial<ClientProfileResponse> = {};
  if (!address) return res.status(200).json({ data: client });
  adjustedData.house = address.house;
  adjustedData.province = address.province;
  adjustedData.district = address.district;
  adjustedData.subDistrict = address.subDistrict;
  adjustedData.zipcode = address.zipcode;
  return res.status(200).json({ data: { ...data, ...adjustedData } });
};

const getClients = async (req: Request, res: Response) => {
  // add type of the query !!!
  const limit = +(req.query.pageSize ?? DEFAULT_PAGE_SIZE);
  const offset = (+(req.query.page ?? "1") - 1) * limit;
  const buildWhereCause = {};
  ["hn", "firstName", "lastName", "nationalId", "phoneNumber"].forEach(
    (key) => {
      if (req.query[key]) {
        buildWhereCause[key] = Like(`%${req.query[key]}%`);
      }
    }
  );
  if (req.query.orthoDentistId) {
    buildWhereCause["orthoDentistId"] = req.query.orthoDentistId;
  }
  const [clients, count] = await clientProfileRepository.findAndCount({
    where: buildWhereCause,
    order: { hn: "ASC" },
    ...(req.query.pagination === "false"
      ? {}
      : {
          take: limit,
          skip: offset,
        }),
  });
  if (req.query.forDropdown) {
    return res.status(200).json({
      data: clients.map((client) => {
        return {
          label: `${client.hn} ${client.firstName}`,
          value: client.hn,
        };
      }),
    });
  }
  return res.status(200).json({
    data: clients,
    pagination: {
      pageSize: limit,
      page: req.query.page ? parseInt(req.query.page as string) : 1,
      total: count,
    },
  });
};

const updateClientProfile = async (req: Request, res: Response) => {
  const { hn } = req.params;
  const {
    nameTitle,
    firstName,
    lastName,
    nationalId,
    phoneNumber,
    gender,
    house,
    subDistrict,
    district,
    province,
    zipcode,
    birthday,
    medicalCondition,
    drugAllergy,
    drugEat,
    orthoDentistId,
  } = req.body as CreateClientRequest;
  const user = (req as any).currentUser;

  const client = await clientProfileRepository.findOne({
    where: { hn },
  });
  if (!client) {
    return res.status(400).json({ message: "Invalid HN" });
  }

  if (birthday && !new Date(birthday)) {
    return res.status(400).json({ message: "Birthday date incorrect format" });
  }

  if (orthoDentistId) {
    const dent = await dentistRepository.find({
      where: { id: orthoDentistId, isOrthoDentist: true },
    });
    if (!dent) {
      return res.status(400).json({ message: "Invalid dentist id" });
    }
  }

  if (
    !(house && subDistrict && district && province && zipcode) &&
    !(!house && !subDistrict && !district && !province && !zipcode)
  ) {
    return res.status(400).json({ message: "Invalid address" });
  }

  if (house && subDistrict && district && province && zipcode) {
    // check address valid
    const provinceEntity = await provincesRepository.findOne({
      where: { id: province },
    });
    if (!provinceEntity) {
      // error invalid province code
      return res.status(400).json({ message: "Invalid province" });
    }
    const districtEntity = await amphuresRepository.findOne({
      where: { id: district, province_id: province },
    });
    if (!districtEntity) {
      // error invalid district code
      return res.status(400).json({ message: "Invalid district" });
    }
    const subDistrictEntity = await tambonsRepository.findOne({
      where: {
        id: subDistrict.id,
        amphure_id: district,
      },
    });
    if (!subDistrictEntity) {
      // error invalid sub district code
      return res.status(400).json({ message: "Invalid sub district" });
    }
  }

  client.nameTitle = nameTitle;
  client.firstName = firstName.trim();
  client.lastName = lastName.trim();
  client.nationalId = nationalId?.trim() || null;
  client.phoneNumber = phoneNumber?.trim();
  client.gender = gender;
  client.address = house
    ? ({
        house,
        subDistrict: subDistrict?.id,
        district,
        province,
        zipcode,
      } as Address)
    : null;
  client.birthday = birthday || null;
  client.medicalCondition = medicalCondition || null;
  client.drugAllergy = drugAllergy || null;
  client.drugEat = drugEat || null;
  client.orthoDentistId = orthoDentistId?.toString() || null;
  client.createdBy = user.id;
  client.updatedBy = user.id;

  const savedClient = await clientProfileRepository.save(client);
  return res
    .status(200)
    .json({ message: "Client updated successfully", data: savedClient });
};

export const ClientProfileController = {
  createClientProfile,
  updateClientProfile,
  getClient,
  getClients,
};
