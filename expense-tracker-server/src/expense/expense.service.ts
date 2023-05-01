import { Injectable } from '@nestjs/common';
import { CreateUpdateExpense } from '../models/expense.model';
import { InjectModel } from '@nestjs/mongoose';
import { Expense, ExpenseDocument } from 'src/schemas/expense.schema';
import { Model } from 'mongoose';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectModel(Expense.name) private expenseModel: Model<ExpenseDocument>,
  ) {}

  async create(CreateUpdateExpense: any): Promise<Expense> {
    return new this.expenseModel(CreateUpdateExpense).save();
  }

  async findAll() {
    return this.expenseModel.find();
  }

  async update(id: string, CreateUpdateExpense: any) {
    return this.expenseModel.updateOne(
      { _id: id },
      { $set: { ...CreateUpdateExpense } },
    );
  }

  async remove(id: string) {
    return this.expenseModel.deleteOne({ id });
  }

  async bulkInsertExpenses(
    expenses: Omit<CreateUpdateExpense, 'id' | 'gender'>[],
  ) {
    return this.expenseModel.insertMany(expenses);
  }

  async deleteAllExpenses() {
    return this.expenseModel.remove({});
  }

  async findExpenseByName(name: string) {
    return this.expenseModel.find({ name: name });
  }

  async sortExpenses(type: 'asc' | 'desc') {
    return this.expenseModel.find().sort({ _id: type === 'asc' ? 1 : -1 });
  }
}
