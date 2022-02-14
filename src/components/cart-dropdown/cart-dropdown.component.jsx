import React from "react";
import { connect } from "react-redux";

import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";

import "./cart-dropdown.styles.scss";

const CartDropdown = ({listItem}) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {listItem.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          imageUrl={item.imageUrl}
          price={item.price}
          quantity={item.quantity ? item.quantity : 1}
        />
      ))}
    </div>
    <CustomButton>CHECK OUT</CustomButton>
  </div>
);

const mapStateToProps = ({ cart: {listItem} }) => ({
  listItem,
});

export default connect(mapStateToProps)(CartDropdown);
