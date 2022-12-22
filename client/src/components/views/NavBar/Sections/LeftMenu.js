import React from "react";
import { Menu } from "antd";
import { DashboardOutlined, HomeFilled } from "@ant-design/icons";

import { useNavigate } from "react-router-dom";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  const navigate = useNavigate();
  return (
    <Menu
      mode={props.mode}
      onClick={({ key }) => {
        if (key !== "/logout") {
          navigate(key);
        }
      }}
      items={[
        { label: "Home", key: "/", icon: <HomeFilled /> },
        { label: "Favorite", key: "/favorite", icon: <DashboardOutlined /> },
      ]}
    ></Menu>
  );
}

export default LeftMenu;
