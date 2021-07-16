import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 } from 'uuid';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'int' })
  order: number;

  @Column({ type: 'varchar', length: 100 })
  description: string;

  @Column({ type: 'varchar', nullable: true })
  userId: string;

  @Column({ type: 'varchar' })
  boardId: string;

  @Column({ type: 'varchar', nullable: true })
  columnId: string;

  constructor(title, order, description, userId, boardId, columnId, id = v4()) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}
