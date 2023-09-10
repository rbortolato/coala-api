import { BookDto } from "src/books/dto/bookDto";
import { RequestDto } from "src/requests/dto/requestDto";

export interface UserDto {
    id: number;
    login: String;
    password?: String;
    name: String;
    books?: BookDto[];
    requests?: RequestDto[];
}
