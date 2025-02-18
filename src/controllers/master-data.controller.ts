import { ProvincesEntity } from "../entity/provinces.entity";
import dataSource from "../dbConfig/dataSource";
import { Request, Response } from "express";
import { TambonsEntity } from "../entity/tambons.entity";
import { AmphuresEntity } from "../entity/amphures.entity";

const provincesRepository = dataSource.getRepository(ProvincesEntity);
const tambonsRepository = dataSource.getRepository(TambonsEntity);
const amphuresRepository = dataSource.getRepository(AmphuresEntity);

const getAddress = async (req: Request, res: Response) => {
  // type => P,T,A
  // A require province_id
  // T require amphure_id
  const { type, provinceId, amphureId } = req.query;
  if (type == "P") {
    const provinces = await provincesRepository.find();
    return res.status(200).json({ data: provinces });
  } else if (type == "A") {
    if (!provinceId || !parseInt(provinceId as string)) {
      return res.status(400).json({ message: "Require province ID" });
    }
    const amphure = await amphuresRepository.find({
      where: { province_id: parseInt(provinceId as string) },
    });
    return res.status(200).json({ data: amphure });
  } else if (type == "T") {
    if (!amphureId) {
      return res.status(400).json({ message: "Require amphure ID" });
    }
    const tambons = await tambonsRepository.find({
      where: { amphure_id: parseInt(amphureId as string) },
    });
    return res.status(200).json({
      data: tambons.map((item) => {
        return {
          name_th: item.name_th,
          value: { id: item.id, zip_code: item.zip_code },
        };
      }),
    });
  } else {
    return res.status(400).json({ message: "Invalid query" });
  }
};

export const MasterDataController = {
  getAddress,
};
