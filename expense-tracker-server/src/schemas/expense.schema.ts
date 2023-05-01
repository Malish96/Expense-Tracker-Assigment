import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Mongoose } from 'mongoose';

export type ExpenseDocument = HydratedDocument<Expense>;

@Schema({ timestamps: true })
export class Expense {
  @Prop()
  name: string;

  @Prop()
  category: string;

  @Prop()
  description: string;

  @Prop()
  amount: number;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
