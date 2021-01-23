import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthDTO } from "./dto/auth-dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcryptjs';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

   public async signUp(authDTO: AuthDTO): Promise<void> {
      const { username, password } = authDTO;

      const user: User = new User();
      user.username = username;
      user.salt = await bcrypt.genSalt();
      user.password = await this.hashPassword(password, user.salt);

      try {
         await user.save();
      } catch (err) {
         if (err.code === '23505') {
            throw new ConflictException('Username already exists');
         } else {
            throw new InternalServerErrorException('Internal server error');
         }
      }
   }

   public async validatePassword(authDTO: AuthDTO): Promise<string|null> {
      const { username, password } = authDTO;

      const user = await this.findOne({ username });
      
      if (user && await user.validatePassword(password)) {
         return user.username;
      } else {
         return null;
      }
   }

   private async hashPassword(password: string, salt: string): Promise<string> {
      return bcrypt.hash(password, salt);
   }
}