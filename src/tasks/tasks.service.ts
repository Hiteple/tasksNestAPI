import { Injectable } from '@nestjs/common';
import { ITask } from './tasks.interfaces';

@Injectable()
export class TasksService {
   private tasks  = []

   public getAllTasks(): ITask[] {
      return this.tasks;
   }
}