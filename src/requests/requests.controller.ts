import { Controller, Req, Body, Param, Get, Post, Put, Delete } from '@nestjs/common';
import { IRequestsService } from './requests.service.interface';
import { CreateRequestDto } from './dto/createRequestDto';

@Controller('requests')
export class RequestsController {
    constructor (private requestsService: IRequestsService) {}

    @Post()
    async createRequest(@Body() body: CreateRequestDto, @Req() req) {
        return await this.requestsService.createRequest(req.user.id, body);
    }

    @Get('sent')
    async getRequestsSent(@Req() req) {
        return await this.requestsService.getRequestsSent(req.user.id);
    }

    @Get('received')
    async getRequestsReceived(@Req() req) {
        return await this.requestsService.getRequestsReceived(req.user.id);
    }

    @Put('accept/:id')
    async acceptRequest(@Param('id') id: number) {
        return await this.requestsService.acceptRequest(Number(id));
    }

    @Delete(':id')
    async deleteRequest(@Param('id') id: number) {
        return await this.requestsService.deleteRequest(Number(id));
    }
}
