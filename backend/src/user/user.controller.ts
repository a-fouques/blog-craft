import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { User } from './user.entity';
import { UpdateUserDto } from './update-user.dto';
import { CurrentUser } from 'src/auth/current-user.decorator';

@Controller('user')
export class UserController {
    constructor(private readonly usersService: UserService) {}

    @Post()
    create(@Body() dto: CreateUserDto) {
        return this.usersService.create(dto);
    }

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    
    @UseGuards(JwtAuthGuard)
    @Get('me')
    getMe(@CurrentUser() user: User) {
    return user;
    }


    @UseGuards(JwtAuthGuard)
    @Patch('me')
    updateProfile(@CurrentUser() user: User, @Body() dto: UpdateUserDto) {
        return this.usersService.update(user.id, dto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('me/password')
    async changePassword(
        @CurrentUser() user: User,
        @Body() body: { currentPassword: string; newPassword: string }
    ) {
        console.log("user de me/pass", user);
    return this.usersService.changePassword(user.id, body.currentPassword, body.newPassword);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Get('/admin/users')
    async findAllUsersAsAdmin() {
        try {
            const users = await this.usersService.findAll();
            return users;
          } catch (err) {
            throw err;
          }
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.delete(id);
    }

    
    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.usersService.findById(id);
    }



}
