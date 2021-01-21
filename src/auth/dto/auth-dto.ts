import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthDTO {
   @IsString()
   @MinLength(4)
   @MaxLength(20)
   public username: string;

   @IsString()
   @MinLength(8)
   @MaxLength(20)
   @Matches(/((?=.*\d|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$)/, { message: 'Password does not match requirements' })
   public password: string;
}