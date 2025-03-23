import { Injectable, ForbiddenException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/user.entity";
import { Repository } from "typeorm";
import { Blog } from "./blog.entity";

@Injectable()
export class BlogService {
    constructor(
        @InjectRepository(Blog) private readonly repo: Repository<Blog>,
        @InjectRepository(User) private readonly userRepo: Repository<User>,
      ) {}
      

    async create(title: string, description: string, user: { userId: number }) {
        const fullUser = await this.userRepo.findOneBy({ id: user.userId });
        if (!fullUser) {
        throw new NotFoundException("Utilisateur non trouvé.");
        }

        const blog = this.repo.create({ title, description, author: fullUser });
        console.log('✅ Blog prêt à être enregistré :', blog);
        return this.repo.save(blog);
    }

    findAll() {
        return this.repo.find();
    }

    findById(id: number) {
        return this.repo.findOne({ where: { id } });
    }

    async delete(id: number, userId: number) {
        const blog = await this.repo.findOne({ where: { id }, relations: ['author'] });
        if (!blog || blog.author.id !== userId) {
        throw new ForbiddenException("Tu n'es pas autorisé à supprimer ce blog.");
        }
        return this.repo.remove(blog);
    }
}
