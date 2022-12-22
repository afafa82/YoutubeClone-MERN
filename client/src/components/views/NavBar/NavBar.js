import React, { useEffect, useState } from "react";
import LeftMenu from "./Sections/LeftMenu";
import RightMenu from "./Sections/RightMenu";
import { Drawer, Button } from "antd";
import  { MenuOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import {
  FileJpgOutlined,
  LoginOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";

import axios from "axios";
import { USER_SERVER } from "../../../Config";
import Auth from "../../../hoc/auth";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Sections/Navbar.css";

function NavBar() {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        navigate("/login");
      } else {
        alert("Log Out Failed");
      }
    });
  };
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  return (
    <div style={{height:"49px"}}>
    <nav
      className="menu"
      style={{ position: "fixed", zIndex: 5, width: "100%" }}
    >
      <div className="menu__logo">
        <a href="/">Logo</a>
      </div>
      <div className="menu__container">
        <div className="menu_left">
          <LeftMenu mode="horizontal" />
        </div>
        <div className="menu_right">
          <RightMenu mode="horizontal" />
        </div>
        <Button className="menu__mobile-button" onClick={showDrawer}>
          <MenuOutlined
            type="align-right"
            style={{ color: "white", fontSize: "1rem" }}
          />
        </Button>
        <Drawer
          title="Basic Drawer"
          placement="right"
          className="menu_drawer"
          closable={false}
          onClose={onClose}
          open={visible}
        >
          <LeftMenu mode="inline" />
          <RightMenu mode="inline" />
        </Drawer>
      </div>
    </nav>
    </div>
  );
 
  

}

export default NavBar;
