import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // handle the new user registration
  async register(registerDto: RegisterDto) {
    try {
      const { email = undefined, password = undefined } = registerDto || {};
      if (!email || !password) {
        throw new BadRequestException('Please pass both email and password');
      }
      // check if the user already exists
      const existingUser = await this.prisma.user.findUnique({
        where: { email },
      });
      if (existingUser) {
        throw new ConflictException(
          'User already exists! Please try with a different email',
        );
      }
      // hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      // create the new user
      const newlyCreatedUser = await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });
      // remove password before returning newly created user
      const { password: _, ...result } = newlyCreatedUser;
      return result;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async login(LoginDto: LoginDto) {
    try {
      const { email = undefined, password = undefined } = LoginDto || {};
      if (!email || !password) {
        throw new BadRequestException('Please pass both email and password');
      }
      // find the current user by email
      const user = await this.prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new UnauthorizedException(
          'Invalid credentials! Please try again',
        );
      }

      // verify the password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException(
          'Invalid credentials! Please try again',
        );
      }

      // create token
      const token = this.jwtService.sign({ userId: user.id });
      const { password: _, ...result } = user;
      return { ...result, token };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
