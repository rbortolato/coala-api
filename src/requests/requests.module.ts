import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { PrismaService } from '../prisma.service';
import { BooksService } from 'src/books/books.service';
import { IBooksService } from 'src/books/books.service.interface';
import { IRequestsService } from './requests.service.interface';

const booksServiceProvider = { provide: IBooksService, useClass: BooksService };
const requestsServiceProvider = { provide: IRequestsService, useClass: RequestsService };

@Module({
  providers: [
    requestsServiceProvider,
    PrismaService,
    booksServiceProvider
  ],
  controllers: [RequestsController]
})
export class RequestsModule {}
