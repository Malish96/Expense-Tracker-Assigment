require('dotenv').config();
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExpenseModule } from './expense/expense.module';
import { CategoryModule } from './categories/categories.module';

const developmentDBURL = `mongodb://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/`;

@Module({
  imports: [
    CategoryModule,
    ExpenseModule,
    MongooseModule.forRoot(developmentDBURL),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
