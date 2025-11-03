import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CatsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;
}
