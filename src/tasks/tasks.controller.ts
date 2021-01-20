import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { FilterTaskDTO } from './dto/filter-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { ITask } from './tasks.interfaces';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
   constructor(private tasksService: TasksService) {}

   @Get()
   public getTasks(@Query(ValidationPipe) filterTaskDTO: FilterTaskDTO): ITask[] {
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
   @UsePipes(ValidationPipe)
   public createTask(@Body() createTaskDTO: CreateTaskDTO): ITask {
      return this.tasksService.createTask(createTaskDTO);
   }

   @Patch('/:id/status')
   public updateTask(@Param('id') id: string, @Body(TaskStatusValidationPipe) updateTaskDTO: UpdateTaskDTO): ITask {
      return this.tasksService.updateTask(id, updateTaskDTO);
   }

   @Delete('/:id')
   public deleteTask(@Param('id') id: string): void {
      return this.tasksService.deleteTask(id);
   }
}
