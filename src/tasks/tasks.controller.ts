import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { FilterTaskDTO } from './dto/filter-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
   constructor(private tasksService: TasksService) {}

   @Get()
   public getTasks(@Query(ValidationPipe) filterTaskDTO: FilterTaskDTO): Promise<Task[]> {
      return this.tasksService.getTasks(filterTaskDTO);
   }

   @Get('/:id')
   public getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
      return this.tasksService.getTaskById(id);
   }

   @Post()
   @UsePipes(ValidationPipe)
   public createTask(@Body() createTaskDTO: CreateTaskDTO): Promise<Task> {
      return this.tasksService.createTask(createTaskDTO);
   }

   @Patch('/:id/status')
   public updateTask(@Param('id', ParseIntPipe) id: number, @Body(TaskStatusValidationPipe) updateTaskDTO: UpdateTaskDTO): Promise<Task> {
      return this.tasksService.updateTask(id, updateTaskDTO);
   }

   @Delete('/:id')
   public deleteTask(@Param('id', ParseIntPipe) id: number): Promise<Task> {
      return this.tasksService.deleteTask(id);
   }
}
