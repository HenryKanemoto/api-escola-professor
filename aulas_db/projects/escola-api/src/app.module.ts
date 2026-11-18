import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AlunosModule } from './alunos/alunos.module.js';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import Joi from 'joi';
import { MongooseModule } from '@nestjs/mongoose';

export const { ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    AlunosModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object ({
        NODE_ENV: Joi.string().valid('desenvolvimento', 'producao', 'teste').default('desenvolvimento'),
        PORT: Joi.number().default(3000),
        MONGO_URI: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
      }),
    }),
    MongooseModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:(ConfigService: ConfigService) => ({
        uri: ConfigService.get<string>('MONGO_URI')
      }),
    }),
    AlunosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
