import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
// decorator to specify as global
@Global()
@Module({
  providers: [PrismaService],
  // makes sure prisma service is available to other service that will import the prisma module
  exports: [PrismaService],
})
export class PrismaModule {}
