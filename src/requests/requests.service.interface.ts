import { CreateRequestDto } from "./dto/createRequestDto";
import { RequestDto } from "./dto/requestDto";

export abstract class IRequestsService {
    abstract createRequest(user_id: number, createRequestData: CreateRequestDto): Promise<RequestDto>;
    abstract getRequestsSent(user_id: number): Promise<RequestDto[]>;
    abstract getRequestsReceived(user_id: number): Promise<RequestDto[]>;
    abstract acceptRequest(id: number): Promise<any>;
    abstract deleteRequest(id: number): Promise<RequestDto>;
}
