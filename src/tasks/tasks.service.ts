import { Injectable } from '@nestjs/common';
import { ITask, TaskStatus } from './tasks.interfaces';
import { v4 as uuidv4} from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';

@Injectable()
export class TasksService {
   private tasks: ITask[]  = [];

   public getAllTasks(): ITask[] {
      return this.tasks;
   }

   public getTaskById(id: string): ITask {
      return this.tasks.find((task: ITask) => task.id === id);
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
      const {title, description, status } = updateTaskDTO;
      let updatedTask: ITask = this.getTaskById(id);
      updatedTask.title = title;
      updatedTask.description = description;
      updatedTask.status = status;

      return updatedTask;
   }

   public deleteTask(id: string): void {
      this.tasks = this.tasks.filter((task: ITask) => task.id !== id);
   }
}