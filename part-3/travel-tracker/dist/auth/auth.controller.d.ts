import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    registerNewUser(registerDto: RegisterDto): Promise<{
        email: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(LoginDto: LoginDto): Promise<{
        token: string;
        email: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
