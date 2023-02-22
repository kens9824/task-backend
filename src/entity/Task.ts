import { TaskStatus } from "../types/TaskStatusType";
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  taskName: string;

  @Column()
  taskAssign: string;

  @Column({default: TaskStatus.todo})
  status: string;

  @Column({ type: "timestamp", nullable: true })
  last_updated: Date;

  @Column({ type: "timestamp", nullable: true })
  timestamp: Date;
}
