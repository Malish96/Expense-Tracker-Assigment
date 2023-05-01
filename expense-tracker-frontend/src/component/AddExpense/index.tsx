import React, { useEffect, useState } from "react";
import { Modal, Form, Input, InputNumber } from "antd";

interface ExpenseProps {
  isModalVisible: boolean;
  isEditing: boolean;
  onCancel: any;
  saveData: any;
}
const AddExpense: React.FC<ExpenseProps> = (props) => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const handleOk = () => {
    form.validateFields().then((values) => {
      setConfirmLoading(true);

      setConfirmLoading(false);
      form.resetFields();
    });
  };

  return (
    <>
      <Modal
        title={props.isEditing ? "Edit Expense" : "Add Expense"}
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
            rules={[
              {
                required: true,
                message: "Please enter a name for the expense",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[
              {
                required: true,
                message: "Please select a category for the expense",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="amount"
            label="Amount"
            rules={[
              {
                required: true,
                message: "Please enter an amount for the expense",
              },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddExpense;
