import { Injectable } from '@nestjs/common';
import { ITask, TaskStatus } from './tasks.interfaces';
import { v4 as uuidv4} from 'uuid';

@Injectable()
export class TasksService {
   private tasks: ITask[]  = [];

   public getAllTasks(): ITask[] {
      return this.tasks;
   }

   public createTask(title: string, description: string): ITask {
      const task: ITask = {
         id: uuidv4(),
         title,
         description,
         status: TaskStatus.OPEN
      };

      this.tasks.push(task);
      return task;
   }
}