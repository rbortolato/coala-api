import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import { IBooksService } from './books.service.interface';
import { BookDto } from './dto/bookDto';
import { CreateBookDto } from './dto/createBookDto';
import { UpdateBookDto } from './dto/updateBookDto';
import { FilterDto } from './dto/filterDto';

@Injectable()
export class BooksService implements IBooksService {
    constructor(private prisma: PrismaService) {}

    async getBooksFromUser(user_id: number): Promise<BookDto[]> {
        const where: Prisma.booksWhereInput = { user_id };
        return await this.prisma.books.findMany({
            where,
            orderBy: { title: 'asc'}
        });
    }

    async listBooks(user_id: number, filter: FilterDto): Promise <BookDto[]> {
        return await this.prisma.books.findMany({
            where: {
                OR: [
                    { title: { contains: filter.searchInput } },
                    { author: { contains: filter.searchInput } },
                    { publisher: { contains: filter.searchInput } },
                    { user: { name: {contains: filter.searchInput } } },
                ],
                user_id: { not: user_id }
            },
            include: { user: true},
            orderBy: { title: 'asc'}
        });
    }


    async createBook(user_id: number, createBookData: CreateBookDto): Promise<BookDto> {
        return await this.prisma.books.create({
            data: {
                user_id,
                title: createBookData.title,
                author: createBookData.author,
                publisher: createBookData.publisher,
                edition: Number(createBookData.edition)
            },
        });
    }

    async updateBook(id: number, updateBookData: UpdateBookDto): Promise<BookDto> {
        const where: Prisma.booksWhereUniqueInput = { id };
        return await this.prisma.books.update({
            data: {
                title: updateBookData.title,
                author: updateBookData.author,
                publisher: updateBookData.publisher,
                edition: Number(updateBookData.edition)
            },
            where
        })
    }

    async deleteBook(id: number): Promise<BookDto> {
        const where: Prisma.booksWhereUniqueInput = { id };
        return await this.prisma.books.delete({
            where
        })
    }

    async exchange_book(book: BookDto, book_exchange: BookDto): Promise<BookDto> {
        await this.prisma.books.update({
            data: { user_id: book.user_id },
            where: { id: book_exchange.id }
        });

        return this.prisma.books.update({
            data: { user_id: book_exchange.user_id },
            where: { id: book.id }
        });
    }
}
