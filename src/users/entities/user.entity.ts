import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 } from 'uuid';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  login: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  constructor(name, login, password, id = v4()) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }
}
