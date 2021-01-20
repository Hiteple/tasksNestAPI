import { BadRequestException, PipeTransform } from "@nestjs/common";
import { UpdateTaskDTO } from "../dto/update-task.dto";
import { TaskStatus } from "../enums/status";

export class TaskStatusValidationPipe implements PipeTransform {
   private readonly allowedStatuses: string[] = [TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE];

   private isStatusValid(status: string): boolean {
      const index: number = this.allowedStatuses.indexOf(status);
      return index !== -1;
   }

   public transform(value: UpdateTaskDTO) {
      const status: string = value.status.toUpperCase();
      if (!this.isStatusValid(status)) {
         throw new BadRequestException(`"${status}" is an invalid status`);
      }
      return value;
   }
}