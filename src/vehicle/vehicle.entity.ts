import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

class ColumnNumericTransformer {
  to(data: number): number {
    return data;
  }
  from(data: string): number {
    return parseFloat(data);
  }
}

export enum ConditionEnum {
  NEW = 'new',
  ALMOST_NEW = 'almost_new',
  USED = 'used',
  GOOD_CONDITION = 'in_good_condition',
  NEEDS_REPAIR = 'needs_repair',
}

@Entity('vehicle')
export class VehicleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  brand: string;

  @Column({ length: 100 })
  model: string;

  @Column('text')
  image: string;

  @Column('numeric', {
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  price: number;

  @Column('text')
  description: string;

  @Column({ length: 100 })
  condition: string;

  @Column('integer')
  year: number;

  @Column('integer', { nullable: true })
  mileage: number;

  @Column({ length: 20, name: 'engine', nullable: true })
  engine: string;
}
