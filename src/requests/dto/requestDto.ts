import { BookDto } from "src/books/dto/bookDto";
import { UserDto } from "src/users/dto/userDto";

export interface RequestDto {
    id: number;
    user?: UserDto;
    user_id: number;
    book?: BookDto;
    book_id: number;
    book_exchange?: BookDto;
    book_exchange_id: number;
}
