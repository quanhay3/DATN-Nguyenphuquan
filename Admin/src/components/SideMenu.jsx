import { Layout, Menu } from "antd";
const { Sider } = Layout;
import React from "react";
import { PieChartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Logo from "./logo";
import images from "../assets/images";

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
    getItem(<Link to="/admin">Trang chủ</Link>, "1", <PieChartOutlined />),
    getItem("Hàng hóa", "2", <ShoppingCartOutlined />, [
      getItem(<Link to="/admin/product/list">Danh sách hàng hóa</Link>, "3"),
    ]),
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
              url={images.adminLogoPath}
            ></Logo>
          ) : (
            <Logo
              className="w-[65px] h-[65px]"
              url={images.logoIconPath}
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
