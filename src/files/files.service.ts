import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { S3 } from 'aws-sdk';
import { Logger } from '@nestjs/common';
@Injectable()
export class FilesService {
  constructor(private readonly prismaService: PrismaService) {}
  uploadFilePrisma(file: any, destination: string) {
    return this.prismaService.files.create({
      data: {
        name: file.originalname,
        size: `${file.size}`,
        ext: '',
        destination,
      },
    });
  }
  uploadFileMany(files: any[]) {
    return this.prismaService.files.createMany({
      data: files.map(file => ({
        name: file.originalname,
        size: `${file.size}`,
        ext: '',
        destination: file.path,
      })),
    });
  }

  async uploadFile(file) {
    const { originalname } = file;
    const bucketS3 = 'nest-test-dev-serverlessdeploymentbucket-6frnxqqx1x2y';
    return this.uploadS3(file.buffer, bucketS3, originalname)
      .then((e: any) => {
        return this.uploadFilePrisma({ ...file, name: e?.Key }, e.Location);
      })
      .catch(e => {
        throw new BadRequestException(e?.message);
      });
  }

  async uploadS3(file, bucket, name) {
    const s3 = this.getS3();
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
    };
    console.log('e', params);

    return new Promise((resolve, reject) => {
      return s3.upload(params, (err, data) => {
        if (err) {
          Logger.error(err);
          reject(err.message);
        }
        resolve(data);
      });
    }).catch(e => {
      // throw new BadRequestException(e?.message);
    });
  }
  getS3Image(key: string) {
    const s3 = this.getS3();
    const params = {
      Bucket: 'nest-test-dev-serverlessdeploymentbucket-6frnxqqx1x2y',
      Key: String(key),
    };
    return s3.getSignedUrlPromise('getObject', params);
  }
  getS3() {
    return new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }
}
