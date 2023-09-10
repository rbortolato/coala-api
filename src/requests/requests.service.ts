import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import { IBooksService } from 'src/books/books.service.interface';
import { IRequestsService } from './requests.service.interface';
import { CreateRequestDto } from './dto/createRequestDto';
import { RequestDto } from './dto/requestDto';

@Injectable()
export class RequestsService implements IRequestsService {
    constructor(private prisma: PrismaService, private bookService: IBooksService) {}

    async createRequest(user_id: number, createRequestData: CreateRequestDto): Promise<RequestDto> {
        return await this.prisma.requests.create({
            data: {
                user_id,
                book_id: createRequestData.book_id,
                book_exchange_id: createRequestData.book_exchange_id
            }
        });
    }

    async getRequestsSent(user_id: number): Promise<RequestDto[]> {
        const where: Prisma.requestsWhereInput = { user_id };
        return await this.prisma.requests.findMany({
            where,
            include: { book: true, book_exchange: {include: { user: true }}}
        });
    }

    async getRequestsReceived(user_id: number): Promise<RequestDto[]> {
        return await this.prisma.requests.findMany({
            where: { book_exchange: { user_id } },
            include: { book: {include: { user: true }}, book_exchange: true}
        });
    }

    async acceptRequest(id: number): Promise<any> {
        const where: Prisma.requestsWhereUniqueInput = { id };
        const request = await this.prisma.requests.findUnique({
            where,
            include: { book: true, book_exchange: true }
        });

        await this.prisma.requests.deleteMany({
            where: {
                OR: [
                    { book_id: request.book_id },
                    { book_exchange_id: request.book_id },
                    { book_id: request.book_exchange_id },
                    { book_exchange_id: request.book_exchange_id }
                ]
            }
        });

        return this.bookService.exchange_book(request.book, request.book_exchange);
    }


    async deleteRequest(id: number): Promise<RequestDto> {
        const where: Prisma.requestsWhereUniqueInput = { id };
        return await this.prisma.requests.delete({
            where
        })
    }
}
