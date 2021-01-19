import { Body, Controller, Get, Post } from '@nestjs/common';
import { ITask } from './tasks.interfaces';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
   constructor(private tasksService: TasksService) {}

   @Get()
   public getAllTasks(): ITask[] {
      return this.tasksService.getAllTasks();
   }

   @Post()
   public createTask(@Body('title') title: string, @Body('description') description: string): ITask {
      return this.tasksService.createTask(title, description);
   }
}
