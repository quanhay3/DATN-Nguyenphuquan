import React from "react";
import { useLoginMutation } from "../../../services/auth.service";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Form, Input, message } from "antd";
import Loading from "../../../components/Loading/Loading";
import { saveTokenAndUser } from "../../../slices/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const onFinish = async (values = {}) => {
    try {
      const data = await login({
        email: values.email,
        password: values.password,
      }).unwrap();
      
      dispatch(
        saveTokenAndUser({
          accessToken: data?.body.data.accessToken,
          user: data?.body.data.data,
        })
      );
      
      if (data?.body.data.data.role !== "admin") {
        navigate("/");
      } else {
        navigate("/admin");
      }
    } catch (error) {
      message.error(error?.data?.message);
    }
  };

  if (isLoading) return <Loading screenSize="lg" />;
  return (
    <div className="py-11">
      <h1 className="text-center text-3xl my-4 font-bold">Đăng nhập</h1>
      <Form
        name="basic"
        className="mx-auto"
        labelCol={{
          span: 4,
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
          label="Email" 
          name="email" 
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
            {
              type: "email",
              message: "Please input a valid email!",
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
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label={null} className="mb-1 ps-24">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        <Link className="ms-24 text-blue-500 underline" to="/signup">Đăng ký</Link>
      </Form>
    </div>
  );
};

export default Login;
