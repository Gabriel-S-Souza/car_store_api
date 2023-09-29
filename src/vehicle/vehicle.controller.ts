import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleEntity } from './vehicle.entity';
import { UpdateVehicleDto } from './dtos/update-vehicle.dtor';
import { CreateVehicleDto } from './dtos/create-vehicle.dto';

@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get()
  async getAllVehicles(@Query('page') page: number): Promise<VehicleEntity[]> {
    return this.vehicleService.getVehicles(page);
  }

  @Get(':id')
  async getVehicleById(@Param('id') id: number): Promise<VehicleEntity> {
    return this.vehicleService.getVehicleById(id);
  }

  @Post()
  async createVehicle(
    @Body() createVehicleDto: CreateVehicleDto,
  ): Promise<VehicleEntity> {
    return this.vehicleService.createVehicle(createVehicleDto);
  }

  @Put(':id')
  async updateVehicle(
    @Param('id') id: number,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ): Promise<VehicleEntity> {
    return this.vehicleService.updateVehicle(id, updateVehicleDto);
  }

  @Delete(':id')
  async deleteVehicle(@Param('id') id: number): Promise<void> {
    return this.vehicleService.deleteVehicle(id);
  }
}
