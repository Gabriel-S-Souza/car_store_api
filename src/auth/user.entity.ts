import { Roles } from 'src/helpers/roles.helper';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 100 })
  password: string;

  toResponse({ role = Roles.USER }: { role?: string } = {}) {
    const { id, name, email } = this;
    return { id, name, email, role };
  }
}
