import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { FilterTaskDTO } from './dto/filter-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { ITask } from './tasks.interfaces';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
   constructor(private tasksService: TasksService) {}

   @Get()
   public getTasks(@Query() filterTaskDTO: FilterTaskDTO): ITask[] {
      if (Object.keys(filterTaskDTO).length) {
         return this.tasksService.getFilteredTasks(filterTaskDTO);
      } else {
         return this.tasksService.getTasks();
      }
   }

   @Get('/:id')
   public getTaskById(@Param('id') id: string): ITask {
      return this.tasksService.getTaskById(id);
   }

   @Post()
   public createTask(@Body() createTaskDTO: CreateTaskDTO): ITask {
      return this.tasksService.createTask(createTaskDTO);
   }

   @Patch('/:id/status')
   public updateTask(@Param('id') id: string, @Body() updateTaskDTO: UpdateTaskDTO): ITask {
      return this.tasksService.updateTask(id, updateTaskDTO);
   }

   @Delete('/:id')
   public deleteTask(@Param('id') id: string): void {
      return this.tasksService.deleteTask(id);
   }
}
