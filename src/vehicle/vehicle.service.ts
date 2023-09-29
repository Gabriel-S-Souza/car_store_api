import { Injectable, NotFoundException } from '@nestjs/common';
import { VehicleEntity } from './vehicle.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateVehicleDto } from './dtos/create-vehicle.dto';
import { ErrorHelper } from 'src/helpers/error.helper';

const LIMIT = 10;

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(VehicleEntity)
    private readonly vehicleRepository: Repository<VehicleEntity>,
  ) {}

  async getVehicles(page = 1): Promise<VehicleEntity[]> {
    const skip = (page - 1) * LIMIT;
    return await this.vehicleRepository.find({
      skip,
      take: LIMIT,
      select: {
        id: true,
        name: true,
        brand: true,
        model: true,
        price: true,
        image: true,
      },
    });
  }

  async getVehicleById(id: number): Promise<VehicleEntity> {
    try {
      const vehicle = await this.vehicleRepository.findOneByOrFail({ id });
      return vehicle;
    } catch (error) {
      throw new NotFoundException(ErrorHelper.VEHICLE_NOT_FOUND);
    }
  }

  async createVehicle(
    CreateVehicleDto: CreateVehicleDto,
  ): Promise<VehicleEntity> {
    const vehicle = this.vehicleRepository.create(CreateVehicleDto);
    return await this.vehicleRepository.save(vehicle);
  }

  async updateVehicle(
    id: number,
    updateVehicleDto: CreateVehicleDto,
  ): Promise<VehicleEntity> {
    const vehicle = await this.getVehicleById(id);
    Object.assign(vehicle, updateVehicleDto);
    return await this.vehicleRepository.save(vehicle);
  }

  async deleteVehicle(id: number): Promise<any> {
    try {
      const vehicle = await this.getVehicleById(id);
      const result = await this.vehicleRepository.remove(vehicle);
      if (result instanceof VehicleEntity) {
        return {
          statusCode: 200,
          message: 'Veículo deletado com sucesso',
        };
      } else {
        throw new NotFoundException(ErrorHelper.VEHICLE_NOT_FOUND);
      }
    } catch (error) {
      throw error;
    }
  }
}
