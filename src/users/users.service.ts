import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createAsync(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  async findAllAsync(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOneAsync(id: number): Promise<User>;
  async findOneAsync(userName: string): Promise<User>;
  async findOneAsync(identifier: number | string): Promise<User | null> {
    if (typeof identifier === 'number') {
      return await this.userRepository.findOneBy({ id: identifier });
    } else {
      return await this.userRepository.findOneBy({ userName: identifier });
    }
  }

  async updateAsync(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return await this.userRepository.findOneBy({ id });
  }

  async removeAsync(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
