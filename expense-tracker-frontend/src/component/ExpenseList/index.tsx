import React, { useState, useEffect } from "react";
import { Table, Button, Tooltip, Popconfirm, Space } from "antd";
import AddExpense from "../AddExpense";
import { ReactComponent as EditIcon } from "../../assets/icon-feather-edit.svg";
import { ReactComponent as DeleteIcon } from "../../assets/icon-feather-delete.svg";
import AddExpenseType from "../ExpenseType";
import ExpenseSerivce, { Expenses } from "../../services/ExpensesService";
import ExpenseCategorySerivce, { ExpenseCategory } from "../../services/ExpenseCategoryService";
import { AxiosError, AxiosResponse } from "axios";

const ExpenseList: React.FC = () => {
  const [addModalVisblity, setAddModalVisblity] = useState(false);
  const [addTypeModalVisblity, setAddTypeModalVisblity] = useState(false);
  const handleCancel = () => {
    setAddModalVisblity(false);
    setAddTypeModalVisblity(false);
  };
  const [isEditing, setIsEditing] = useState(false)
  const [data, setData] = useState<any[]>([]);
  const getAllExpenses = async () => {
    const expenses = new ExpenseSerivce();
    const expensesRecords = await expenses.getAllExpenses();
    const expenseData: Expenses[] = expensesRecords.data.data;
    setData(expenseData);
    console.log(expenseData)
  };
  useEffect(() => {
    getAllExpenses();
  }, []);
  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const expenseServiceObject = new ExpenseSerivce();
    const formData = new FormData(event.currentTarget);
    const expenses: Expenses = {
      name: String(formData.get('name')),
      category: String(formData.get('category')),
      description: String(formData.get('description')),
      amount: parseInt(String(formData.get('amount')), 10),
    };
    expenseServiceObject.createExpenses(expenses)
      .then((response: AxiosResponse) => {
        const restrcutredResponse: any = response.data;
        setAddModalVisblity(false);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }
  
  
  const handleSaveCategory = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const expenseCategoryServiceObject = new ExpenseCategorySerivce();
    const formData = new FormData(event.currentTarget);
    const expenseCategory: ExpenseCategory = {
      name: String(formData.get('name')),
    }
    expenseCategoryServiceObject.addExpenseCategory(expenseCategory)
      .then((response: AxiosResponse) => {
        const restrcutredResponse: any = response.data;
        setAddModalVisblity(false)
      })
      .catch((error: AxiosError) => {
        console.log(error)
      });
  }
  const onDeleteConfirm = (id: any) => {
    const expenseServiceObject = new ExpenseSerivce();
    expenseServiceObject.deleteExpenses(id)
      .then((response: AxiosResponse) => {
        console.log(response)
      })
      .catch((error: AxiosError) => {
        console.log(error)
      });
  };

  const columns = [
    {
      title: "Expense Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Expense Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "date",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <Space>
          <Tooltip title="Edit">
            <span
              style={{
                paddingRight: "16px",
                position: "relative",
                top: "4px",
              }}
            >
              <EditIcon
                width={20}
                height={20}
                onClick={() => {

                }}
              />
            </span>
          </Tooltip>

          <Popconfirm
            placement="topLeft"
            title="Are you sure you want to delete this expense record?"
            onConfirm={() => onDeleteConfirm(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title="Delete">
              <span
                style={{
                  paddingRight: "16px",
                  position: "relative",
                  top: "4px",
                }}
              >
                <DeleteIcon width={20} height={20} />
              </span>
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div
        style={{
          float: "right",
        }}
      >
        <Button
          style={{ margin: "5px", backgroundColor: "#95BDFF" }}
          onClick={() => setAddModalVisblity(true)}
        >
          Add Expense
        </Button>
        <Button
          style={{ margin: "5px", backgroundColor: "#95BDFF" }}
          onClick={() => setAddTypeModalVisblity(true)}
        >
          Add Expense Category
        </Button>
      </div>
      <Table dataSource={data} columns={columns} scroll={{ x: 240 }} />
      <AddExpense
        isEditing={isEditing}
        isModalVisible={addModalVisblity}
        onCancel={handleCancel}
        saveData={handleSave}
      />
      <AddExpenseType
        isModalVisible={addTypeModalVisblity}
        onCancel={handleCancel}
        saveData={handleSaveCategory}
      />
    </>
  );
} 
    
export default ExpenseList;
