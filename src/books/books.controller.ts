import { Controller, Req, Body, Param, Get, Post, Put, Delete, Query } from '@nestjs/common';
import { IBooksService } from './books.service.interface';
import { CreateBookDto } from './dto/createBookDto';
import { UpdateBookDto } from './dto/updateBookDto';
import { FilterDto } from './dto/filterDto';


@Controller('books')
export class BooksController {
    constructor (private booksService: IBooksService) {}

    @Get()
    async getBooksFromUser(@Req() req) {
        return await this.booksService.getBooksFromUser(req.user.id);
    }

    @Get('list')
    async listBooks(@Req() req, @Query() filter: FilterDto) {
        return await this.booksService.listBooks(req.user.id, filter);
    }

    @Post()
    async createBook(@Body() body: CreateBookDto, @Req() req) {
        return await this.booksService.createBook(req.user.id, body);
    }

    @Put(':id')
    async updateBook(@Body() body: UpdateBookDto, @Param('id') id: string) {
        return await this.booksService.updateBook(Number(id), body);
    }

    @Delete(':id')
    async deleteBook(@Param('id') id: string) {
        return await this.booksService.deleteBook(Number(id));
    }
}
