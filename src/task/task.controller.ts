import { NotFoundException, Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from '@prisma/client';

@Controller('tasks')
export class TaskController {
    constructor(private readonly tasksService: TaskService) {}

    @Get()
    getAllTasks() {
       return this.tasksService.getAllTasks();
    }

    @Post()
    async createTask(@Body() data: Task) {
        return this.tasksService.createTask(data);
    }

    @Get(':id')
    async getTaskById(@Param('id') id: string) {
       const taskFound =  await this.tasksService.getTaskById(Number(id)) //search for task
       if (!taskFound) throw new NotFoundException('Task does not exist') //if task not found, Task does not exist
       return taskFound //return task
    }
    @Delete(':id')
    async deleteTask(@Param('id') id: string) {
        try {
            return await this.tasksService.deleteTask(Number(id))
        } catch (error) {
            throw new NotFoundException('Task does not exist') // Task does not exist
        }
    }
    @Put(':id')
    async updateTask(@Param('id') id: string, @Body() data: Task) {
    try {
        return await this.tasksService.updateTask(Number(id), data)
    } catch (error) {
        throw new NotFoundException('Task does not exist') // Task does not exist
        
    }
    }
}
