import {
  Controller,
  UseFilters,
  HttpStatus,
  HttpException,
  Get,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/ExceptionFilter/http-exception.filter';
@Controller('paper')
export class PaperController {
  @Get('/test')
  @UseFilters(new HttpExceptionFilter())
  async findOne() {
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: 'Access to this site is forbidden',
      },
      403,
    );
  }
}
