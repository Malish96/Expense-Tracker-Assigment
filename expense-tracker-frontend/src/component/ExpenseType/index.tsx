import React, { useState } from "react";
import { Modal, Form, Input } from 'antd';


interface ExpensePropsType {
    isModalVisible: boolean;
    onCancel: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  saveData: any;
  }
const AddExpenseType: React.FC<ExpensePropsType> = (props) => {
    const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {
    form.validateFields().then((values) => {
      setConfirmLoading(true);
     
        setConfirmLoading(false);
        form.resetFields();
    
    });
    };
    const categoryOptions = [
        { label: 'Food', value: 'food' },
        { label: 'Transportation', value: 'transportation' },
        { label: 'Entertainment', value: 'entertainment' },
        
      ];
    return <>
        <Modal
            title={ "Add Expense Type"}
      open={props.isModalVisible}
      onCancel={props.onCancel}
      onOk={handleOk}
            confirmLoading={confirmLoading}
            destroyOnClose={true}
    >
      <Form form={form} layout="vertical" initialValues={{ amount: 0 }}>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please enter a type of expense' }]}
        >
          <Input />
        </Form.Item>    
      </Form>
    </Modal>
    </> 
}

export default AddExpenseType;


