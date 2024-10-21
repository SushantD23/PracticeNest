import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { crudModel } from './crud.model';
import { Op } from 'sequelize';
import { unlink } from 'fs/promises';

@Injectable()
export class crudService {
  constructor(@InjectModel(crudModel) private crudmodel: typeof crudModel) {}

  // Create ...
  async createdTest(body) {
    return await this.crudmodel.create(body);
  }

  // Read ...
  async showAll() {
    return await this.crudmodel.findAll();
  }

  //Read Specific ...
  async ShowSpec(tId: number) {
    return await this.crudmodel.findOne({
      where: { tId },
    });
  }

  //Update ...
  async updateTest(tId: number, updateData: Partial<crudModel>) {
    return await this.crudmodel.update(updateData, {
      where: { tId },
      returning: true,
    });
  }

  // Delete ...
  async delete(tId: number) {
    return await this.crudmodel.destroy({
      where: { tId },
    });
  }

  async delAColumn(tId: number) {
    const user = await this.crudmodel.findOne({
      where: { tId },
    });

    if (!user) return 'Incorrect Id or User has been removed';
    else {
      user.tprofile = null;
      user.save();
    }
    return 'profile picture has been removed';
  }
  //Find by age ...
  async findByAge(tAge: number) {
    return await this.crudmodel.findAll({
      where: {
        tAge: {
          [Op.gt]: tAge,
        },
      },
    });
  }

  async logOpt(tAge: number) {
    return await this.crudmodel.findAll({
      where: {
        [Op.or]: [
          { tAge: { [Op.gte]: tAge } },
          { tName: { [Op.like]: '%Q%' } },
        ],
      },
    });
  }

  async profileUpload(tId: number, filePath: string) {
    const user = this.crudmodel.findOne({
      where: {
        tId: tId,
      },
    });
    if (!user) {
      return 'User Not Found';
    }
    (await user).tprofile = filePath;
    (await user).save();
    return user;
  }

  async updateProfile(tId: number, filePath: string) {
    const user = await this.crudmodel.findOne({
      where: { tId },
    });
    if (user?.tprofile) {
      try {
        await unlink(`uploadedFile/${user.tprofile}`);
      } catch (err) {
        console.log('Something happens', err);
      }
    }

    user.tprofile = filePath;
    user.save();
    return user;
  }

  async usingjsonB(tId: number, jsonb: object) {
    const user = await this.crudmodel.findOne({
      where: { tId },
    });

    if (user) {
      user.tjsonb = jsonb;
      await user.save();
      return user;
    } else {
      return 'Incorrect Id else user has been removed';
    }
  }

    async filterjson() {
      return await this.crudmodel.findAll({
        attributes: ['tName', 'tjsonb'],

        where: {
          [Op.and]: [
            {
              tjsonb: {
                [Op.contains]: { "Address": {"Landmark": ["Dholakpur"] }},
                // "Purpose": "Study",
                // ...tjsonb,{
                //   "Purpose": "Job",
                // }
              },
            },
            { tjsonb: { "IsLocal": false } },
          ],
        },
      });
    }
}
