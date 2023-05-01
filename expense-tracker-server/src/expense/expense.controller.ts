import { ExpenseService } from './expense.service';
import { errorRes, successRes } from '../utls/response.formatter';
import _ = require('lodash');
import { UsePipes } from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common/pipes';
import { ExpenseDto, ExpenseParamsDto } from './dto/create-update-expense.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
} from '@nestjs/common';

@Controller('api/expenses')
export class ExpenseController {
  constructor(
    private readonly expenseService: ExpenseService,
    private readonly logger: Logger,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() CreateUpdateExpense: ExpenseDto) {
    try {
      const createdExpense = await this.expenseService.create(
        CreateUpdateExpense,
      );
      return successRes('Expense created successfully', createdExpense);
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }

  @Get()
  async findAll() {
    try {
      const expenses = await this.expenseService.findAll();
      if (_.isEmpty(expenses)) {
        return errorRes('Error fetching expenses');
      }
      return successRes('Expenses fetching successfully', expenses);
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param() params: ExpenseParamsDto,
    @Body() CreateUpdateExpense: ExpenseDto,
  ) {
    try {
      const updatedExpense = await this.expenseService.update(
        params.id,
        CreateUpdateExpense,
      );
      return successRes('Expense updated successfully', updatedExpense);
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }

  @Delete(':id')
  async remove(@Param() params: ExpenseParamsDto) {
    try {
      const deletedExpense = await this.expenseService.remove(params.id);
      return successRes('Expense removed successfully', deletedExpense);
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }

  @Get('find-by-name/:name')
  async findOneByName(@Param() params: any) {
    try {
      const expense = await this.expenseService.findExpenseByName(params.name);
      if (_.isEmpty(expense)) {
        return errorRes('Error fetching expense');
      }
      return successRes('Expense fetched successfully', expense);
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }

  @Get('sort-expenses/:type')
  async sortExpenses(@Param() params: any) {
    try {
      const expense = await this.expenseService.sortExpenses(params.type);
      if (_.isEmpty(expense)) {
        return errorRes('Error fetching expense');
      }
      return successRes('Expenses fetched successfully', expense);
    } catch (error) {
      this.logger.error((error as Error).message);
      return errorRes((error as Error).message);
    }
  }
}
