import { TaskStatus } from "./enums/status";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task extends BaseEntity {
   @PrimaryGeneratedColumn()
   public id: number;
   
   @Column()
   public title: string;

   @Column()
   public description: string;

   @Column()
   status: TaskStatus
}