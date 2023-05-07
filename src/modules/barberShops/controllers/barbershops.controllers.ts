import { Controller, Get } from '@nestjs/common';
import { BarberShopService } from '../services';

@Controller('api/v1/barberShop')
export class BarberShopController {
  constructor(private readonly barberShopService: BarberShopService) {}

  @Get('/simple')
  async listSimple() {
    return await this.barberShopService.listSimple();
  }
}
