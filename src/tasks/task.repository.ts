import { Task } from "./task.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { TaskStatus } from "./enums/status";
import { FilterTaskDTO } from "./dto/filter-task.dto";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
   public async getTasks(filterTaskDTO: FilterTaskDTO): Promise<Task[]> {
      const { status, search } = filterTaskDTO;
      const query = this.createQueryBuilder('task');

      if (status) {
         query.andWhere('task.status = :status', { status });
      }

      if (search) {
         query.andWhere('task.title LIKE :search OR task.description LIKE :search', { search: `%${search}%` });
      }

      const tasks: Task[] = await query.getMany();
      return tasks;
   }

   public async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
      const task = new Task();
      const { title, description } = createTaskDTO;
      task.title = title;
      task.description = description;
      task.status = TaskStatus.OPEN;
      await task.save();

      return task;
   }
}