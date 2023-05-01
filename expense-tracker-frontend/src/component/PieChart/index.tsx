import React, { useState, useEffect } from "react";
import { Pie } from "@ant-design/plots";
import ExpenseSerivce, { Expenses } from "../../services/ExpensesService";
import _ from 'lodash';

const PieChartComponent = () => {
  const [data, setData] = useState<any[]>([]);
  const getAllExpenses = async () => {
    console.log("llllll");
    const expenses = new ExpenseSerivce();
    const expensesRecords = await expenses.getAllExpenses();
    const expenseData: Expenses[] = expensesRecords.data.data;
    const restructuredData = expenseData.map((expense) => ({
      value: expense.amount,
      type: expense.category,
    }));
    setData(restructuredData);
    console.log(expensesRecords);
  };
  useEffect(() => {
    getAllExpenses();
  }, []);

  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.75,
    label: {
      type: "spider",
      labelHeight: 28,
      content: "{name}\n{percentage}",
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
  };
  return <>
    { !_.isEmpty(data) && !_.isUndefined(data) ? < Pie {...config} /> : <></> }
  </>
  
};

export default PieChartComponent;
