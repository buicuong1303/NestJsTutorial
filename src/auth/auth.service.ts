import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthenCredentialsDto } from './dto/auth-credential.dto';
import { User } from './auth.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}
  async signUp(authenDto: AuthenCredentialsDto): Promise<void> {
    const { username, password } = authenDto;
    const salt = await bcrypt.genSalt();
    const user = new User();
    user.username = username;
    user.salt = salt;
    user.password = await this.hasPassword(password, salt);
    try {
      await user.save();
    } catch (error) {
      if (error.code == 23505) throw new ConflictException('Username is exist');
      else throw new InternalServerErrorException();
    }
  }
  private async hasPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }

  async signIn(
    authenDto: AuthenCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const username = await this.validateUserPassword(authenDto);
    if (!username)
      throw new UnauthorizedException('username or password incorrrect');

    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }

  async validateUserPassword(authenDto: AuthenCredentialsDto): Promise<string> {
    const { username, password } = authenDto;
    const user = await this.userRepository.findOne({ username });
    if (user && (await user.validatePassword(password))) return user.username;
    return null;
  }
}
