import BaseService from './BaseService';

export type ExpenseCategory = {
  name: string;
};

class ExpenseCategoryService extends BaseService {
  public addExpenseCategory = async (expenseCategory: ExpenseCategory) => {
    return this.connection.post('/api/categories', expenseCategory);
  };

  public getAllExpenseCategory = async () => {
    return this.connection.get('/api/categories');
  };
}

export default ExpenseCategoryService;
