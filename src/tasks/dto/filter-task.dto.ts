import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { TaskStatus } from "../enums/status";

export class FilterTaskDTO {
   @IsOptional()
   @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
   status: TaskStatus;

   @IsOptional()
   @IsNotEmpty()
   search: string;
}