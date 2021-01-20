import { Injectable, NotFoundException } from '@nestjs/common';
import { ITask, TaskStatus } from './tasks.interfaces';
import { v4 as uuidv4} from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { FilterTaskDTO } from './dto/filter-task.dto';

@Injectable()
export class TasksService {
   private tasks: ITask[]  = [];

   public getTasks(): ITask[] {
      return this.tasks;
   }

   public getFilteredTasks(filterTaskDTO: FilterTaskDTO): ITask[] {
      const { status, search } = filterTaskDTO;

      let tasks = this.getTasks();

      if (status) {
         tasks = tasks.filter((task: ITask) => task.status === status);
      }

      if (search) {
         tasks = tasks.filter((task: ITask) => task.title.includes(search) || task.description.includes(search));
      }

      return tasks;
   }

   public getTaskById(id: string): ITask {
      const foundTask: ITask = this.tasks.find((task: ITask) => task.id === id);

      if (!foundTask) {
         throw new NotFoundException(`Task with ID ${id} not found`);
      }

      return foundTask;
   }

   public createTask(createTaskDTO: CreateTaskDTO): ITask {
      const { title, description } = createTaskDTO;
      const task: ITask = {
         id: uuidv4(),
         title,
         description,
         status: TaskStatus.OPEN
      };

      this.tasks.push(task);
      return task;
   }

   public updateTask(id: string, updateTaskDTO: UpdateTaskDTO): ITask {
      const { status } = updateTaskDTO;
      let updatedTask: ITask = this.getTaskById(id);
      updatedTask.status = status;

      return updatedTask;
   }

   public deleteTask(id: string): void {
      const foundTask: ITask = this.getTaskById(id);
      this.tasks = this.tasks.filter((task: ITask) => task.id !== foundTask.id);
   }
}