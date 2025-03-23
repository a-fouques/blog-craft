import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private repo: Repository<User>) {}

    async create(data: CreateUserDto) {
        const user = this.repo.create(data); // déjà hashé
        return this.repo.save(user);
      }
      

    async findAll() {
        return this.repo.find();
      }

    async findByEmail(email: string) {
        return this.repo.findOne({ where: { email } });
    }

    async findById(id: number) {
        return this.repo.findOne({ where: { id } });
    }

    async delete(id: number) {
        const user = await this.repo.findOne({ where: { id } });
        if (!user) {
          throw new Error(`Utilisateur avec l'id ${id} non trouvé`);
        }
        return this.repo.remove(user);
      }
}
