import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth-dto';

@Controller('auth')
export class AuthController {
   constructor(private authService: AuthService) {}

   @Post('/signup')
   public async signUp(@Body(ValidationPipe) authDTO: AuthDTO): Promise<void> {
      return this.authService.signUp(authDTO);
   }

   @Post('/signin')
   public async signIn(@Body(ValidationPipe) authDTO: AuthDTO): Promise<any> {
      return this.authService.signIn(authDTO);
   }
}
