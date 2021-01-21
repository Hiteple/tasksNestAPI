import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from 'nestjs-config';
import { resolve } from 'path';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import config from './config/typeorm.config';

@Module({
  imports: [
     ConfigModule.load(resolve(__dirname, 'config', '**/!(*.d).{js,ts}'), {
        path: resolve(process.cwd(), 'environments', '.env.development')
     }),
     TasksModule,
     TypeOrmModule.forRoot(config),
     AuthModule
   ]
})
export class AppModule {}