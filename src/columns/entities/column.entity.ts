import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 } from 'uuid';

@Entity()
export class Columns {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column()
  order: number;

  @Column('uuid')
  boardID: string;

  constructor(title, order, boardID, id = v4()) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.boardID = boardID;
  }
}
