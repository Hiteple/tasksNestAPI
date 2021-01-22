import { TypeOrmModuleOptions } from "@nestjs/typeorm";

const {
   DB_HOST,
   DB_PORT,
   DB_USERNAME,
   DB_PASSWORD,
} = process.env;

const config: TypeOrmModuleOptions = {
   type: 'postgres',
   host: DB_HOST,
   port: parseInt(DB_PORT),
   username: DB_USERNAME,
   password: DB_PASSWORD,
   database: 'tasksmanagement',
   entities: [__dirname + '/../**/*.entity.{js,ts}'],
   synchronize: false
};

export default config;