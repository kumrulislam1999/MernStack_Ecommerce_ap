import React from "react";
import { NavLink } from "react-router-dom";
/* ===== Start Import React Icon ===== */
import { FaShopify } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";

/* ===== Start Import React Icon ===== */
export default function UserMenu() {
  return (
    <>
      <div id="userMenu">
        <h3>Admin Panel</h3>
        <ul className="menuList">
          <li>
            <NavLink to={"/dashboard/user/profile"}>
              <span>
                <FaCircleUser className="icon" />
              </span>
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/user/orders"}>
              <span>
                <FaShopify className="icon" />
              </span>
              Orders
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}
