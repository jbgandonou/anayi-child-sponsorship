import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChildService } from './child.service';
import { ChildController } from './child.controller';
import { Child } from './child.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Child])],
  controllers: [ChildController],
  providers: [ChildService],
  exports: [ChildService],
})
export class ChildModule {}
