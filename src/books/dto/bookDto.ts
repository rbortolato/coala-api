import { RequestDto } from "src/requests/dto/requestDto";
import { UserDto } from "src/users/dto/userDto";

export interface BookDto {
    id: number;
    user?: UserDto;
    user_id: number;
    title: String;
    author?: String;
    publisher?: String;
    edition?: number;
    requests?: RequestDto[];
    requests_exchange?: RequestDto[];
}
