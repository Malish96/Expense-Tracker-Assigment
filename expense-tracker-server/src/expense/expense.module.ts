import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Expense, ExpenseSchema } from 'src/schemas/expense.schema';
import { Logger } from '@nestjs/common/services';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Expense.name,
        schema: ExpenseSchema,
      },
    ]),
  ],
  controllers: [ExpenseController],
  providers: [ExpenseService, Logger],
  exports: [ExpenseService],
})
export class ExpenseModule {}
