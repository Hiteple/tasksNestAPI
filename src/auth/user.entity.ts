import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Task } from "src/tasks/task.entity";

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
   @PrimaryGeneratedColumn()
   public id: number;

   @Column()
   public username: string;

   @Column()
   public password: string;

   @Column()
   public salt: string;

   @OneToMany(type => Task, task => task.user, { eager: true })
   public tasks: Task[]

   // Methods
   public async validatePassword(password: string): Promise<boolean> {
      const hash: string = await bcrypt.hash(password, this.salt);
      return hash === this.password;
   }
}