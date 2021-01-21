import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcrypt';

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

   // Methods
   public async validatePassword(password: string): Promise<boolean> {
      const hash: string = await bcrypt.hash(password, this.salt);
      return hash == this.password;
   }
}