import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthDTO } from "./dto/auth-dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';

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

   private async hashPassword(password: string, salt: string): Promise<string> {
      return bcrypt.hash(password, salt);
   }
}