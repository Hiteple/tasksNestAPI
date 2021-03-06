import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './enums/status';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { FilterTaskDTO } from './dto/filter-task.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
   constructor(@InjectRepository(TaskRepository) private taskRepository: TaskRepository) {}

   public getTasks(filterTaskDTO: FilterTaskDTO, user: User): Promise<Task[]> {
      return this.taskRepository.getTasks(filterTaskDTO, user);
   }

   public async getTaskById(id: number, user: User): Promise<Task> {
      const foundTask = await this.taskRepository.findOne({ where: { id, userId: user.id } });

      if (!foundTask) {
         throw new NotFoundException(`Task with ID ${id} not found`);
      }

      return foundTask;
   }

   public createTask(createTaskDTO: CreateTaskDTO, user: User): Promise<Task> {
      return this.taskRepository.createTask(createTaskDTO, user);
   }


   public async updateTask(id: number, updateTaskDTO: UpdateTaskDTO, user: User): Promise<Task> {
      const foundTask = await this.getTaskById(id, user);
      foundTask.status = updateTaskDTO.status;
      await foundTask.save();

      return foundTask;
   }

   public async deleteTask(id: number, user: User): Promise<Task> {
      const foundTask = await this.getTaskById(id, user);

      if (!foundTask) {
         throw new NotFoundException(`Task with ID ${id} not found`);
      }

      await this.taskRepository.delete(foundTask);

      return foundTask;
   }
}