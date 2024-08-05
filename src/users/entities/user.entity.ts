import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryColumn()
  id: number;

  @Column({ length: 30, nullable: false, unique: true })
  userName: string;

  @Column({ length: 60, nullable: false, unique: true })
  email: string;

  @Column({ length: 255, nullable: false })
  encPassword: string;

  @Column('simple-array', { default: 'user', nullable: false })
  roles: string[];

  @Column({ nullable: true })
  refreshToken: string;

  @Column()
  refreshTokenExp: Date;
}
