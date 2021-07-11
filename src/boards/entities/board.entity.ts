import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 } from 'uuid';

@Entity()
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  constructor(title, id = v4()) {
    this.id = id;
    this.title = title;
  }
}
