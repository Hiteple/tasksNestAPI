import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { FilterTaskDTO } from './dto/filter-task.dto';
import { TaskStatus } from './enums/status';
import { TaskRepository } from './task.repository';
import { TasksService } from './tasks.service';

// User mock
const mockUser = {
   id: 1,
   username: 'Axel'
};

// Task repository mock, not using the real one
const mockTaskRepository = () => ({
   getTasks: jest.fn(),
   findOne: jest.fn(),
   createTask: jest.fn(),
   delete: jest.fn()
});

describe('TasksService', () => {
   let tasksService;
   let taskRepository;

   beforeEach(async () => {
      const module = await Test.createTestingModule({
         providers: [
            TasksService,
            { provide: TaskRepository, useFactory: mockTaskRepository }
         ]
      }).compile()

      tasksService = await module.get<TasksService>(TasksService);
      taskRepository = await module.get<TaskRepository>(TaskRepository);
   });

   describe('getTasks', () => {
      it('gets all tasks from repository', async () => {
         taskRepository.getTasks.mockResolvedValue('some value');
         expect(taskRepository.getTasks).not.toHaveBeenCalled();
         const filters: FilterTaskDTO = { status: TaskStatus.IN_PROGRESS, search: 'Some search query' };
         const result = await tasksService.getTasks(filters, mockUser);

         tasksService.getTasks(filters, mockUser);

         // Assert
         expect(taskRepository.getTasks).toHaveBeenCalled();
         expect(result).toEqual('some value');
      });
   });

   describe('getTaskById', () => {
      it('calls taskRepository.findOne()', async () => {
         // Arrange
         const mockTask = { title: 'some title', description: 'some description' };
         taskRepository.findOne.mockResolvedValue(mockTask);

         // Act
         const result = await tasksService.getTaskById(1, mockUser);

         // Assert
         expect(result).toEqual(mockTask);
         expect(taskRepository.findOne).toHaveBeenCalledWith({
            where: {
               id: 1,
               userId: mockUser.id
            }
         });
      });

      it('throws error if no task found', async () => {
         // Arrange
         const mockTask = { title: 'some title', description: 'some description' };
         taskRepository.findOne.mockResolvedValue(mockTask);

         const mockedUserToFail = {
            id: 2,
            username: 'john'
         }

         // Act & Assert
         expect(tasksService.getTaskById(1, mockedUserToFail)).rejects.toThrow(NotFoundException);
      });
   });

   describe('createTask', () => {
      it('calls taskRepository.createTask and creates task', async () => {
         expect(taskRepository.createTask).not.toHaveBeenCalled();

         // Arrange
         taskRepository.createTask.mockResolvedValue('task');
         const mockTask = { title: 'some title', description: 'some description' };
         const result = await tasksService.createTask(mockTask, mockUser);
         expect(taskRepository.createTask).toHaveBeenCalledWith(mockTask, mockUser);

         expect(result).toEqual('task');
      });
   });

   describe('deleteTask', () => {
      it('calls taskRepository.deleteTask and deletes a task', async () => {
         expect(taskRepository.delete).not.toHaveBeenCalled();

         // Arrange
         const mockTask = { title: 'some title', description: 'some description' };
         taskRepository.findOne.mockResolvedValue(mockTask);
         taskRepository.delete.mockResolvedValue('task');
         
         // Act
         const result = await tasksService.getTaskById(1, mockUser);
         await tasksService.deleteTask(result.id, mockUser);
         expect(taskRepository.delete).toHaveBeenCalled();
      });

      it('throws error if no task found', () => {
         taskRepository.delete.mockResolvedValue('task');
         expect(tasksService.deleteTask(1, mockUser)).rejects.toThrow(NotFoundException);
      });
   });
});