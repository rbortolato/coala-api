import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { PrismaService } from '../prisma.service';
import { IBooksService } from './books.service.interface';

const booksServiceProvider = { provide: IBooksService, useClass: BooksService };

@Module({
  providers: [
    booksServiceProvider,
    PrismaService
  ],
  controllers: [BooksController],
  exports: [booksServiceProvider]
})
export class BooksModule {}


