import { BookDto } from "./dto/bookDto";
import { CreateBookDto } from "./dto/createBookDto";
import { FilterDto } from "./dto/filterDto";
import { UpdateBookDto } from "./dto/updateBookDto";

export abstract class IBooksService {
    abstract getBooksFromUser(user_id: number): Promise<BookDto[]>;
    abstract listBooks(user_id: number, filter: FilterDto): Promise <BookDto[]>;
    abstract createBook(user_id: number, createBookData: CreateBookDto): Promise<BookDto>;
    abstract updateBook(id: number, updateBookData: UpdateBookDto): Promise<BookDto>;
    abstract deleteBook(id: number): Promise<BookDto>;
    abstract exchange_book(book: BookDto, book_exchange: BookDto): Promise<BookDto>;
}
