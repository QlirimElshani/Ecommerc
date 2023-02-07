import React from "react";
import { Link } from "react-router-dom";

function getCartTotal() {
  return 0;
}

function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/cart">Cart({getCartTotal()})</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
