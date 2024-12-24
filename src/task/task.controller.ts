import { NotFoundException, Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from '@prisma/client';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('tasks')
@ApiTags('Tasks')
export class TaskController {
    constructor(private readonly tasksService: TaskService) {}

    @Get()
    @ApiOperation({ summary: 'List of tasks' })
    @ApiResponse({ status: 200, description: 'List of tasks' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    getAllTasks() {
       return this.tasksService.getAllTasks();
    }

    @Post()
    @ApiOperation({ summary: 'Create a task' })
    @ApiResponse({ status: 200, description: 'Task created successfully' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async createTask(@Body() data: Task) {
        return this.tasksService.createTask(data);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a task by id' })
    @ApiResponse({ status: 200, description: 'Task found' })
    @ApiResponse({ status: 404, description: 'Not found' })
    async getTaskById(@Param('id') id: string) {
       const taskFound =  await this.tasksService.getTaskById(Number(id)) //search for task
       if (!taskFound) throw new NotFoundException('Task does not exist') //if task not found, Task does not exist
       return taskFound //return task
    }
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a task by id' })
    @ApiResponse({ status: 200, description: 'Task deleted successfully' })
    @ApiResponse({ status: 404, description: 'Not found' })
    async deleteTask(@Param('id') id: string) {
        try {
            return await this.tasksService.deleteTask(Number(id))
        } catch (error) {
            throw new NotFoundException('Task does not exist') // Task does not exist
        }
    }
    @Put(':id')
    @ApiOperation({ summary: 'Update a task by id' })
    @ApiResponse({ status: 200, description: 'Task updated successfully' })
    @ApiResponse({ status: 404, description: 'Not found' })
    async updateTask(@Param('id') id: string, @Body() data: Task) {
    try {
        return await this.tasksService.updateTask(Number(id), data)
    } catch (error) {
        throw new NotFoundException('Task does not exist') // Task does not exist
        
    }
    }
}
