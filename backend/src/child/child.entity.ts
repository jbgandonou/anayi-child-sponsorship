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

@Entity('children')
export class Child {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Informations personnelles
  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ name: 'child_photo', nullable: true })
  childPhoto: string;

  @Column()
  gender: string;

  @Column({ name: 'date_of_birth', type: 'date' })
  dateOfBirth: Date;

  @Column({ name: 'place_of_birth' })
  placeOfBirth: string;

  @Column({ name: 'current_village' })
  currentVillage: string;

  @Column()
  nationality: string;

  @Column({ name: 'other_nationality', nullable: true })
  otherNationality: string;

  @Column({ name: 'family_status' })
  familyStatus: string;

  @Column({ name: 'other_family_status', nullable: true })
  otherFamilyStatus: string;

  @Column({ name: 'number_of_siblings', type: 'int' })
  numberOfSiblings: number;

  // Scolarité
  @Column()
  school: string;

  @Column({ name: 'current_level' })
  currentLevel: string;

  @Column({ name: 'other_level', nullable: true })
  otherLevel: string;

  @Column()
  attendance: string;

  @Column({ name: 'school_needs', type: 'json' })
  schoolNeeds: string[];

  @Column({ name: 'other_school_needs', nullable: true })
  otherSchoolNeeds: string;

  // Santé
  @Column({ name: 'health_status' })
  healthStatus: string;

  @Column({ name: 'vaccinations_up_to_date' })
  vaccinationsUpToDate: string;

  @Column({ name: 'specific_health_problems', nullable: true, type: 'text' })
  specificHealthProblems: string;

  // Conditions de vie
  @Column({ name: 'housing_type' })
  housingType: string;

  @Column({ name: 'other_housing_type', nullable: true })
  otherHousingType: string;

  @Column({ name: 'access_to_water' })
  accessToWater: string;

  @Column({ name: 'access_to_electricity' })
  accessToElectricity: string;

  @Column({ name: 'sufficient_food' })
  sufficientFood: string;

  @Column({ name: 'guardian_activity' })
  guardianActivity: string;

  // Parrainage
  @Column({ name: 'wishes_to_be_sponsored' })
  wishesToBeSponsored: string;

  @Column({ name: 'guardian_consent' })
  guardianConsent: string;

  @Column({ name: 'specific_comments', nullable: true, type: 'text' })
  specificComments: string;

  // Documents
  @Column({ name: 'birth_certificate', nullable: true })
  birthCertificate: string;

  @Column({ name: 'school_certificate', nullable: true })
  schoolCertificate: string;

  @Column({ name: 'recent_photo', nullable: true })
  recentPhoto: string;

  // Informations du volontaire
  @Column({ name: 'volunteer_name' })
  volunteerName: string;

  @Column({ name: 'volunteer_contact' })
  volunteerContact: string;

  @Column({ name: 'survey_date', type: 'date' })
  surveyDate: Date;

  // Statut
  @Column({ default: 'pending' })
  status: string;

  @Column({ name: 'created_by', nullable: true })
  createdById: string;

  @ManyToOne(() => User, (user) => user.children)
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
