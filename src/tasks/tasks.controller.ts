import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
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
   public createTask(@Body() createTaskDTO: CreateTaskDTO): ITask {
      return this.tasksService.createTask(createTaskDTO);
   }
}
