import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthDTO } from './dto/auth-dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
   constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {}

   public async signUp(authDTO: AuthDTO): Promise<void> {
      return this.userRepository.signUp(authDTO);
   }

   public async signIn(authDTO: AuthDTO) {
      const username: string = await this.userRepository.validatePassword(authDTO);
      
      if (!username) {
         throw new UnauthorizedException('Invalid credentials');
      }
   }
   
}
