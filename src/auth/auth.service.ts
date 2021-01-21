import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthDTO } from './dto/auth-dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
   constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {}

   public async signUp(authDTO: AuthDTO): Promise<void> {
      return this.userRepository.signUp(authDTO);
   }
   
}
