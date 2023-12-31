import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { VehicleEntity } from './vehicle.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateVehicleDto } from './dtos/create-vehicle.dto';
import { ErrorHelper } from 'src/helpers/error.helper';
import { UpdateVehicleDto } from './dtos/update-vehicle.dtor';

const LIMIT = 10;

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(VehicleEntity)
    private readonly vehicleRepository: Repository<VehicleEntity>,
  ) {}

  async getVehicles(page = 1): Promise<VehicleEntity[]> {
    const skip = (page - 1) * LIMIT;
    const vehicles = await this.vehicleRepository.find({
      skip,
      take: LIMIT,
      order: {
        price: 'ASC',
      },
      select: {
        id: true,
        name: true,
        brand: true,
        model: true,
        price: true,
        image: true,
      },
    });
    if (!vehicles.length) {
      throw new NotFoundException(ErrorHelper.NO_MORE_VEHICLES);
    }
    return vehicles;
  }

  async getVehicleById(id: number): Promise<VehicleEntity> {
    try {
      return await this.vehicleRepository.findOneByOrFail({ id });
    } catch (error) {
      throw new NotFoundException(ErrorHelper.VEHICLE_NOT_FOUND);
    }
  }

  async createVehicle(vehicleDto: CreateVehicleDto): Promise<VehicleEntity> {
    const vehicle = this.vehicleRepository.create(vehicleDto);
    return await this.vehicleRepository.save(vehicle);
  }

  async updateVehicle(
    id: number,
    updateVehicleDto: UpdateVehicleDto,
  ): Promise<VehicleEntity> {
    if (!Object.keys(updateVehicleDto).length) {
      throw new BadRequestException(ErrorHelper.VEHICLE_UPDATE_EMPTY_BODY);
    }
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
