import { Controller, Get, UseGuards, Request, Post } from '@nestjs/common';
import { BarberShopService } from '../services';
import { AuthGuard } from 'src/modules/users/guards';
import { CreateReportInput } from '../dtos';

@Controller('api/v1/barberShop')
export class BarberShopController {
  constructor(private readonly barberShopService: BarberShopService) {}

  @Get('/simple')
  async listSimple() {
    return await this.barberShopService.listSimple();
  }

  @Get('/report')
  @UseGuards(AuthGuard)
  async getReports(@Request() req) {
    const ownerId = req.user.id;
    return await this.barberShopService.getAllReportsByOwner(ownerId);
  }

  @Post('/report')
  @UseGuards(AuthGuard)
  async createReport({ from, to }: CreateReportInput, @Request() req) {
    const ownerId = req.user.id;
    return await this.barberShopService.generateReport(ownerId, new Date(from), new Date(to));
  }
}
