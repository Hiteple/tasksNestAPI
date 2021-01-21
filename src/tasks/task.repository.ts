import { Task } from "./task.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { TaskStatus } from "./enums/status";
import { FilterTaskDTO } from "./dto/filter-task.dto";
import { User } from "src/auth/user.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
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

      const tasks: Task[] = await query.getMany();
      return tasks;
   }

   public async createTask(createTaskDTO: CreateTaskDTO, user: User): Promise<Task> {
      const task = new Task();
      const { title, description } = createTaskDTO;
      task.title = title;
      task.description = description;
      task.status = TaskStatus.OPEN;
      task.user = user;
      await task.save();

      // We don't need to return the user property, only store it in db
      delete task.user;

      return task;
   }
}