import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../../../contexts/auth-context";
import "./nav-links.css";

const NavLinks = () => {
  const { isLoggedin, logout } = useContext(AuthContext);
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact={true}>
          All Users
        </NavLink>
      </li>
      {isLoggedin && (
        <li>
          <NavLink to="/u1/places">My Places</NavLink>
        </li>
      )}
      {isLoggedin && (
        <li>
          <NavLink to="/places/new">Add Place</NavLink>
        </li>
      )}
      {!isLoggedin && (
        <li>
          <NavLink to="/auth">Authenticate</NavLink>
        </li>
      )}
      {isLoggedin && (
        <li>
          <button onClick={logout}>LOG OUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
