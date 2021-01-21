import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthDTO } from './dto/auth-dto';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
   constructor(
      @InjectRepository(UserRepository) private userRepository: UserRepository,
      private jwtService: JwtService
      ) {}

   public async signUp(authDTO: AuthDTO): Promise<void> {
      return this.userRepository.signUp(authDTO);
   }

   public async signIn(authDTO: AuthDTO): Promise<{ accessToken: string }> {
      const username: string = await this.userRepository.validatePassword(authDTO);
      
      if (!username) {
         throw new UnauthorizedException('Invalid credentials');
      };

      // Correct user! Provide token
      const payload: IJwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);

      return { accessToken };
   }
   
}
