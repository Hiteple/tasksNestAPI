import { Controller, Get } from '@nestjs/common';
import { ITask } from './tasks.interfaces';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
   constructor(private tasksService: TasksService) {}

   @Get()
   public getAllTasks(): ITask[] {
      return this.tasksService.getAllTasks();
   }
}
