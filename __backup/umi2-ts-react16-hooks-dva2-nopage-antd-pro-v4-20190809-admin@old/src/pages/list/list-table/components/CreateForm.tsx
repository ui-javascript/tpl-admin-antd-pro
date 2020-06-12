import { Form, Input, Modal } from 'antd';

import { FormComponentProps } from 'antd/es/form';
import React from 'react';

const FormItem = Form.Item;

interface CreateFormProps extends FormComponentProps {
  // 弹框
  modalVisible: boolean;
  // 父组件控制弹框的开关
  handleModalVisible: () => void;
  // 新增
  handleAdd: (fieldsValue: { desc: string }) => void;
}

// FC = FunctionCompnent
const CreateForm: React.FC<CreateFormProps> = props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  // 提交
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;

      // 表单重置
      // form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      // 关闭销毁
      destroyOnClose
      title="新建规则"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="描述">
        {form.getFieldDecorator('desc', {
          rules: [{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
    </Modal>
  );
};

export default Form.create<CreateFormProps>()(CreateForm);
