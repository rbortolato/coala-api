import { CreateUserDto } from "./dto/createUserDto";
import { UserDto } from "./dto/userDto";

export abstract class IUsersService {
    abstract currentUser(id: number): Promise<UserDto>;
    abstract login(login: string, password: string): Promise<UserDto>;
    abstract createUser(createUserData: CreateUserDto): Promise<UserDto>;
}
