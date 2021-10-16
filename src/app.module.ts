import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { SecretDTO } from './config/secret.dto';
import { JwtModule } from '@nestjs/jwt';
import { ProfilesModule } from './profiles/profiles.module';
import { MulterModule } from '@nestjs/platform-express';
import { BrandModule } from './brand/brand.module';
import { FilesModule } from './files/files.module';
import { CategoryModule } from './category/category.module';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { TagModule } from './tag/tag.module';
import { ProductModule } from './product/product.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './config/http.interceptor';
import { GroupModule } from './group/group.module';
import { QouteModule } from './qoute/qoute.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    JwtModule.register({
      secretOrPrivateKey: new SecretDTO().getSecretKey(),
    }),
    ProfilesModule,
    MulterModule.register({
      dest: './assets',
    }),
    BrandModule,
    FilesModule,
    CategoryModule,
    SubCategoryModule,
    TagModule,
    ProductModule,
    GroupModule,
    QouteModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
