import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    registerNewUser(registerDto: RegisterDto): Promise<{
        id: number;
        email: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(LoginDto: LoginDto): Promise<{
        token: string;
        id: number;
        email: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
