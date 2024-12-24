import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Task } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  // list all tasks
  async getAllTasks(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  // get a task by id
  async getTaskById(id: number): Promise<Task> {
    return this.prisma.task.findUnique({
      where: {
        id,
      },
    });
  }

  // create a task
  async createTask(data: Task): Promise<Task> {
    return this.prisma.task.create({
      data,
    });
  }

  //   update a task
  async updateTask(id: number, data: Task): Promise<Task> {
    return this.prisma.task.update({
      where: {
        id,
      },
      data,
    });
  }

  //   delete a task
  async deleteTask(id: number): Promise<Task> {
    return this.prisma.task.delete({
      where: {
        id,
      },
    });
  }
}
