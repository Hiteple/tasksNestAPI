import { Task } from "./task.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { TaskStatus } from "./enums/status";
import { FilterTaskDTO } from "./dto/filter-task.dto";
import { User } from "src/auth/user.entity";
import { InternalServerErrorException, Logger } from "@nestjs/common";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
   private logger = new Logger('TaskRepository');

   public async getTasks(filterTaskDTO: FilterTaskDTO, user: User): Promise<Task[]> {
      const { status, search } = filterTaskDTO;
      const query = this.createQueryBuilder('task');

      query.where('task.userId = :userId', { userId: user.id });

      if (status) {
         query.andWhere('task.status = :status', { status });
      }

      if (search) {
         query.andWhere('task.title LIKE :search OR task.description LIKE :search', { search: `%${search}%` });
      }

      try {
         const tasks: Task[] = await query.getMany();
         return tasks;
      } catch (err) {
         this.logger.error(`Failed to get tasks for user ${user.username}. Filters: ${JSON.stringify(filterTaskDTO)}`, err.stack);
         throw new InternalServerErrorException();
      }
   }

   public async createTask(createTaskDTO: CreateTaskDTO, user: User): Promise<Task> {
      const task = new Task();
      const { title, description } = createTaskDTO;
      task.title = title;
      task.description = description;
      task.status = TaskStatus.OPEN;
      task.user = user;

      try {
         await task.save();
      } catch (err) {
         this.logger.error(`Failed to create a task for user ${user.username}. Data: ${createTaskDTO}`, err.stack);
         throw new InternalServerErrorException();
      }

      // We don't need to return the user property, only store it in db
      delete task.user;

      return task;
   }
}