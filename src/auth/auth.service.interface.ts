export abstract class IAuthService {
    abstract login(login: string, password: string): Promise<any>;
}
