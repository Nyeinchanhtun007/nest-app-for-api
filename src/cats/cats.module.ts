import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsEntity } from './entity/cats.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CatsEntity])],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}

//nest g module cats
