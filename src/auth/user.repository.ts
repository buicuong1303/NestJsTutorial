import { Repository, EntityRepository } from 'typeorm';
import { User } from './auth.entity';
import { AuthenCredentialsDto } from './dto/auth-credential.dto';
@EntityRepository(User)
export class UserRepository extends Repository<User> {}
