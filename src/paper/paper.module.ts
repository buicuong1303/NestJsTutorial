import { Module, Global } from '@nestjs/common';
import { PaperController } from './paper.controller';
import { PaperService } from './paper.service';
@Global()
@Module({
  controllers: [PaperController],
  providers: [PaperService],
})
export class PaperModule {}
