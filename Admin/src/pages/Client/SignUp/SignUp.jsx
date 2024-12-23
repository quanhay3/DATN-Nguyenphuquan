import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Form, Input, message } from "antd";
import Loading from "../../../components/Loading/Loading";
import { useSignupMutation } from "../../../services/auth.service";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signup, { data, isLoading, error }] = useSignupMutation();
  const onFinish = async (values = {}) => {
      try {
        await signup({
            userName: values.userName,
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword,
        }).then(() => navigate('/')).catch((error) => {
            message.error(error.data.message)
        })
    } catch (error) {
      message.error(error.data.message);
    }
  };


  if (isLoading) return <Loading screenSize='lg' />;
  return <div className="py-11">
    <h1 className="text-center text-3xl my-4 font-bold">Đăng ký</h1>
    <Form
      name="basic"
      className="mx-auto"
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="userName"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
          label="Email"  
          name="email" 
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
            {
              type: 'email',
              message: 'Please input a valid email!',
            },
          ]}
        >
          <Input />
        </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Repeat Password"
        name="confirmPassword"
        rules={[
          {
            required: true,
            message: 'Please repeat your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item label={null} className="ms-36 mb-1">
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      <Link className="ms-36 text-blue-500 underline"  to="/login">Đăng nhập</Link>
    </Form>
  </div>;
};

export default SignUp;
