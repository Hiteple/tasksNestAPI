import { TaskStatus } from "../tasks.interfaces";

export class UpdateTaskDTO {
   title: string;
   description: string;
   status: TaskStatus;
}