import BaseService from './BaseService';

export type Expenses = {
  name: string;
  category: string;
  amount: number;
  description: string;
};

class ExpensesService extends BaseService {
  public createExpenses = async (expenses: Expenses) => {
    return this.connection.post('/api/expenses', expenses);
  };

  public getByName = async (name: string) => {
    return this.connection.get(`/api/expenses/${name}`);
  };

  public getAllExpenses = async () => {
    return this.connection.get('/api/expenses/');
  };

  public updateExpenses = async (id: string) => {
    return this.connection.patch(`/api/expenses/${id}`);
  };
  public deleteExpenses = async (id: string) => {
    return this.connection.delete(`/api/expenses/${id}`);
  };
  public sortByName = async (name: string) => {
    return this.connection.get(`/api/sort-expenses/${name}`);
  };
}

export default ExpensesService;
