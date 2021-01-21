import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { FilterTaskDTO } from './dto/filter-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
   constructor(private tasksService: TasksService) {}

   @Get()
   public getTasks(@Query(ValidationPipe) filterTaskDTO: FilterTaskDTO, @GetUser() user: User): Promise<Task[]> {
      return this.tasksService.getTasks(filterTaskDTO, user);
   }

   @Get('/:id')
   public getTaskById(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<Task> {
      return this.tasksService.getTaskById(id, user);
   }

   @Post()
   @UsePipes(ValidationPipe)
   public createTask(@Body() createTaskDTO: CreateTaskDTO, @GetUser() user: User): Promise<Task> {
      return this.tasksService.createTask(createTaskDTO, user);
   }

   @Patch('/:id/status')
   public updateTask(@Param('id', ParseIntPipe) id: number, @Body(TaskStatusValidationPipe) updateTaskDTO: UpdateTaskDTO, @GetUser() user: User): Promise<Task> {
      return this.tasksService.updateTask(id, updateTaskDTO, user);
   }

   @Delete('/:id')
   public deleteTask(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<Task> {
      return this.tasksService.deleteTask(id, user);
   }
}
