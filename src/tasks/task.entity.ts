import { TaskStatus } from "./enums/status";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/auth/user.entity";

@Entity()
export class Task extends BaseEntity {
   @PrimaryGeneratedColumn()
   public id: number;
   
   @Column()
   public title: string;

   @Column()
   public description: string;

   @Column()
   public userId: number;

   @Column()
   public status: TaskStatus

   @ManyToOne(type => User, user => user.tasks, { eager: false })
   public user: User
}