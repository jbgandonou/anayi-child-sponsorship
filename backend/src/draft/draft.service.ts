import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Draft } from './draft.entity';
import { CreateDraftDto, UpdateDraftDto } from './dto/draft.dto';

@Injectable()
export class DraftService {
  constructor(
    @InjectRepository(Draft)
    private readonly draftRepository: Repository<Draft>,
  ) {}

  private generateDraftNumber(): string {
    const prefix = 'INT';
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, '0');
    return `#${prefix}-${year}-${random}`;
  }

  async create(userId: string, createDraftDto: CreateDraftDto): Promise<Draft> {
    const draftNumber = this.generateDraftNumber();

    const draft = this.draftRepository.create({
      userId,
      draftNumber,
      formData: createDraftDto.formData,
      currentStep: createDraftDto.currentStep || 1,
    });

    return await this.draftRepository.save(draft);
  }

  async findAll(userId: string): Promise<Draft[]> {
    return await this.draftRepository.find({
      where: { userId, isCompleted: false },
      order: { updatedAt: 'DESC' },
    });
  }

  async findOne(id: string, userId: string): Promise<Draft> {
    const draft = await this.draftRepository.findOne({
      where: { id },
    });

    if (!draft) {
      throw new NotFoundException(`Draft with ID ${id} not found`);
    }

    if (draft.userId !== userId) {
      throw new ForbiddenException('You do not have permission to access this draft');
    }

    return draft;
  }

  async update(id: string, userId: string, updateDraftDto: UpdateDraftDto): Promise<Draft> {
    const draft = await this.findOne(id, userId);

    if (updateDraftDto.formData) {
      draft.formData = { ...draft.formData, ...updateDraftDto.formData };
    }

    if (updateDraftDto.currentStep !== undefined) {
      draft.currentStep = updateDraftDto.currentStep;
    }

    if (updateDraftDto.isCompleted !== undefined) {
      draft.isCompleted = updateDraftDto.isCompleted;
    }

    return await this.draftRepository.save(draft);
  }

  async remove(id: string, userId: string): Promise<void> {
    const draft = await this.findOne(id, userId);
    await this.draftRepository.remove(draft);
  }

  async markAsCompleted(id: string, userId: string): Promise<Draft> {
    const draft = await this.findOne(id, userId);
    draft.isCompleted = true;
    return await this.draftRepository.save(draft);
  }

  async getAllCompleted(userId: string): Promise<Draft[]> {
    return await this.draftRepository.find({
      where: { userId, isCompleted: true },
      order: { updatedAt: 'DESC' },
    });
  }
}
