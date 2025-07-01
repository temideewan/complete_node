"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async register(registerDto) {
        try {
            const { email = undefined, password = undefined } = registerDto || {};
            if (!email || !password) {
                throw new common_1.BadRequestException('Please pass both email and password');
            }
            const existingUser = await this.prisma.user.findUnique({
                where: { email },
            });
            if (existingUser) {
                throw new common_1.ConflictException('User already exists! Please try with a different email');
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newlyCreatedUser = await this.prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                },
            });
            const { password: _, ...result } = newlyCreatedUser;
            return result;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }
    async login(LoginDto) {
        try {
            const { email = undefined, password = undefined } = LoginDto || {};
            if (!email || !password) {
                throw new common_1.BadRequestException('Please pass both email and password');
            }
            const user = await this.prisma.user.findUnique({ where: { email } });
            if (!user) {
                throw new common_1.UnauthorizedException('Invalid credentials! Please try again');
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new common_1.UnauthorizedException('Invalid credentials! Please try again');
            }
            const token = this.jwtService.sign({ userId: user.id });
            const { password: _, ...result } = user;
            return { ...result, token };
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map