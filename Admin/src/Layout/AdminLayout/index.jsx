import React, { useEffect, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, message, theme } from "antd";
import SideMenu from "../../components/SideMenu";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { deleteTokenAndUser, saveTokenAndUser } from "../../slices/authSlice";
import Loading from "../../components/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useClearTokenMutation, useGetTokenQuery } from "../../services/auth.service";
const { Header, Content } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [checking, setChecking] = useState(true);
  const { data, isLoading, refetch, error } = useGetTokenQuery();
  const auth = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [clearToken] = useClearTokenMutation();

  useEffect(() => {
    if (!isLoading && data?.body?.data) {
      (async () =>
        await refetch()
          .unwrap()
          .then(async (res) => {
            if (
              data?.body?.data.accessToken != "" &&
              res?.body?.data.accessToken == "" &&
              Object.keys(auth.user).length > 0
            ) {
              navigate("/?err=1");
            } else if (Object.keys(auth.user).length == 0 && checking) {
              if (Object.keys(res.body.data.data).length > 0) {
                dispatch(
                  saveTokenAndUser({
                    accessToken: res.body.data.accessToken,
                    user: res.body.data.data,
                  })
                );
                if (res.body.data.data.role != "admin") {
                  message.warning(
                    "Bạn không có quyền hạn để truy cập vào trang này"
                  );
                  navigate("/");
                }
              } else {
                message.warning("Vui lòng đăng nhập để vào trang này");
                navigate("/");
              }
            } else if (
              Object.keys(res.body.data.data).length > 0 &&
              Object.keys(auth.user).length > 0 &&
              !checking
            ) {
              dispatch(
                saveTokenAndUser({
                  accessToken: res.body.data.accessToken,
                  user: res.body.data.data,
                })
              );
              if (res.body.data.data.role != "admin") {
                message.warning(
                  "Bạn không có quyền hạn để truy cập vào trang này"
                );
                navigate("/");
              }
            }
            setChecking(false);
          }))();
    } else if (error?.data?.status === 400) {
      message.warning(error?.data?.message);
      dispatch(deleteTokenAndUser());
      clearToken();
      navigate("/login");
    }
  }, [data, isLoading, pathname]);

  if (checking) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loading sreenSize="lg" />
      </div>
    );
  }

  return (
    <Layout className="min-h-screen">
      <SideMenu collapsed={collapsed} setCollapsed={setCollapsed}></SideMenu>
      <Layout className="h-full">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;
