import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthenCredentialsDto } from './dto/auth-credential.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './auth.entity';
@Controller('auth')
export class AuthController {
  constructor(private authenService: AuthService) {}
  @Post('/signup')
  signUp(@Body(ValidationPipe) authenDto: AuthenCredentialsDto): Promise<void> {
    return this.authenService.signUp(authenDto);
  }
  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authenDto: AuthenCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authenService.signIn(authenDto);
  }
  // @Post('/test')
  // @UseGuards(AuthGuard())
  // test(@GetUser() user: User) {
  //   console.log(user);
  // }
}
