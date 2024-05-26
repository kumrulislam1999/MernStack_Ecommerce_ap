import React from "react";
import { NavLink } from "react-router-dom";

/* ===== Start Import React Icon ===== */
import { FaProductHunt } from "react-icons/fa";
import { TbCategoryFilled } from "react-icons/tb";
import { FaCircleUser } from "react-icons/fa6";
import { CgProductHunt } from "react-icons/cg";
import { LuGalleryVerticalEnd } from "react-icons/lu";
import { FaShopify } from "react-icons/fa";

/* ===== Start Import React Icon ===== */

export default function AdminMenu() {
  return (
    <>
      <div id="adminMenu">
        <h3>Admin Panel</h3>
        <ul className="menuList">
          <li>
            <NavLink to={"/dashboard/admin/create-category"}>
              <span>
                <TbCategoryFilled className="icon" />
              </span>
              Create Category
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/admin/create-product"}>
              <span>
                <FaProductHunt className="icon" />
              </span>
              Create Product
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/admin/products"}>
              <span>
                <LuGalleryVerticalEnd className="icon" />
              </span>
              Products
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/admin/orders"}>
              <span>
                <FaShopify className="icon" />
              </span>
              Orders
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/admin/create-user"}>
              <span>
                <FaCircleUser className="icon" />
              </span>
              Users
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}
