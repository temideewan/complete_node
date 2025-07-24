import { Injectable, InternalServerErrorException } from '@nestjs/common';
import PrismaService from 'src/prisma/prisma.service';
import {
  v2 as cloudinary,
  UploadApiErrorResponse,
  UploadApiResponse,
} from 'cloudinary';
import * as fs from 'fs';
import { Express } from 'express';
type UploadResponses = UploadApiErrorResponse | UploadApiResponse | undefined;
@Injectable()
export class FileUploadService {
  constructor(private prisma: PrismaService) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadFile(file: Express.Multer.File) {
    try {
      const uploadResult = (await this.uploadToCloudinary(
        file.path,
      )) as UploadApiResponse;
      if (!uploadResult) {
        throw new InternalServerErrorException(
          'File upload failed, please try again',
        );
      }
      const newFile = await this.prisma.file.create({
        data: {
          filename: file.originalname,
          publicId: uploadResult.public_id,
          imageUrl: uploadResult.secure_url,
        },
      });

      fs.unlinkSync(file.path);
      return newFile;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      if (file?.path && fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
      throw new InternalServerErrorException(
        'File upload failed, please try again later',
      );
    }
  }

  private uploadToCloudinary(filePath: string): Promise<UploadResponses> {
    return new Promise((resolve, reject) => {
      void cloudinary.uploader.upload(filePath, (error, result) => {
        if (error) {
          // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
          reject(error);
        }
        resolve(result);
      });
    });
  }
}
