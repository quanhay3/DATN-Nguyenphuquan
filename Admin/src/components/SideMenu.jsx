import { Layout, Menu } from "antd";
const { Sider } = Layout;
import React from "react";
import { PieChartOutlined, ProductFilled, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import images from "../assets/images";
import { RiBillFill } from "react-icons/ri";

const SideMenu = ({ collapsed, setCollapsed = () => {} }) => {
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const items = [
    getItem(<Link to="/admin">Danh sách hàng hóa</Link>, "1", <ProductFilled />),
    getItem(<Link to="/admin/orders">Đơn hàng</Link>, "2", <RiBillFill/>),
    getItem(<Link to="/admin/users">Người dùng</Link>, "3", <UserOutlined />),
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="max-h-[150px] flex justify-center items-center">
        <Link to={"/admin"} className="flex justify-center items-center">
          {!collapsed ? (
            <Logo
              className="w-[200px] h-[65px]"
              url={"https://res.cloudinary.com/dpwto5xyv/image/upload/v1735803469/learnECMAS/adminLogo_i0niub.png"}
            ></Logo>
          ) : (
            <Logo
              className="w-[65px] h-[65px]"
              url={"https://res.cloudinary.com/dpwto5xyv/image/upload/v1735803469/learnECMAS/logoIcon_wqukyx.png"}
            ></Logo>
          )}
          {/* </Link> */}
        </Link>
      </div>
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
      />
    </Sider>
  );
};

export default SideMenu;
