import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './enums/status';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { FilterTaskDTO } from './dto/filter-task.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
   constructor(@InjectRepository(TaskRepository) private taskRepository: TaskRepository) {}

   public getTasks(filterTaskDTO: FilterTaskDTO): Promise<Task[]> {
      return this.taskRepository.getTasks(filterTaskDTO);
   }

   public async getTaskById(id: number): Promise<Task> {
      const foundTask = await this.taskRepository.findOne(id);

      if (!foundTask) {
         throw new NotFoundException(`Task with ID ${id} not found`);
      }

      return foundTask;
   }

   public createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
      return this.taskRepository.createTask(createTaskDTO);
   }

   public async updateTask(id: number, updateTaskDTO: UpdateTaskDTO): Promise<Task> {
      const foundTask = await this.getTaskById(id);
      foundTask.status = updateTaskDTO.status;
      await foundTask.save();

      return foundTask;
   }

   public async deleteTask(id: number): Promise<Task> {
      const foundTask = await this.getTaskById(id);

      if (!foundTask) {
         throw new NotFoundException(`Task with ID ${id} not found`);
      }

      await this.taskRepository.delete(foundTask);

      return foundTask;
   }
}