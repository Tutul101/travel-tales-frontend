import React, { useState } from "react";
import { Link } from "react-router-dom";

import MainHeader from "../main-header";

import "./main-navigation.css";
import NavLinks from "../nav-links";
import SideDrawer from "../side-drawer";
import Backdrop from "../../backdrop";

const MainNavigation = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawer = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawer = () => {
    setDrawerIsOpen(false);
  };
  return (
    <>
      {drawerIsOpen && <Backdrop onClick={closeDrawer} />}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawer}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>

      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={openDrawer}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <Link to="/">
          <h1 className="main-navigation__title">Your Places</h1>
        </Link>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
};

export default MainNavigation;
