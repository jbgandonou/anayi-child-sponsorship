import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../auth/user.entity';

@Entity('drafts')
export class Draft {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'draft_number', unique: true })
  draftNumber: string;

  @Column({ type: 'json' })
  formData: any;

  @Column({ name: 'current_step', default: 1 })
  currentStep: number;

  @Column({ name: 'is_completed', default: false })
  isCompleted: boolean;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
