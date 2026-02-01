import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Child } from './child.entity';
import { CreateChildDto } from './dto/create-child.dto';

@Injectable()
export class ChildService {
  constructor(
    @InjectRepository(Child)
    private readonly childRepository: Repository<Child>,
  ) {}

  async create(createChildDto: CreateChildDto): Promise<Child> {
    const child = this.childRepository.create(createChildDto);
    return await this.childRepository.save(child);
  }

  async findAll(): Promise<Child[]> {
    return await this.childRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Child> {
    const child = await this.childRepository.findOne({ where: { id } });
    if (!child) {
      throw new NotFoundException(`Child with ID ${id} not found`);
    }
    return child;
  }

  async update(id: string, updateData: Partial<CreateChildDto>): Promise<Child> {
    const child = await this.findOne(id);
    Object.assign(child, updateData);
    return await this.childRepository.save(child);
  }

  async remove(id: string): Promise<void> {
    const child = await this.findOne(id);
    await this.childRepository.remove(child);
  }

  async updateStatus(id: string, status: string): Promise<Child> {
    const child = await this.findOne(id);
    child.status = status;
    return await this.childRepository.save(child);
  }

  async findByStatus(status: string): Promise<Child[]> {
    return await this.childRepository.find({
      where: { status },
      order: { createdAt: 'DESC' },
    });
  }
}
