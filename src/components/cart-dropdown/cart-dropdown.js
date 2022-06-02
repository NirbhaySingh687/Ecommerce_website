import React from "react"
import CustomButton from "../custom-button/custom-button";
import "./cart-dropdown.scss"
import CartItem from "../cart-item/cart-item"
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectCartItems } from "../../redux/cart/cart.selector";
import { toggleCartHidden} from "../../redux/cart/cart.action";

const CartDropdown = ({ cartItems, dispatch }) => {
    return(
        <div className="cart-dropdown">
            <div className="cart-items">
                {
                    cartItems.length ?
                        cartItems.map((cartItem,index) => (
                            <CartItem key={index} item={cartItem}/>
                        )) :
                        <span className="empty-message">Your cart is empty</span>
                }
            </div>
            <CustomButton><NavLink to="/checkout" onClick={()=> dispatch(toggleCartHidden())}>GO to Checkout</NavLink></CustomButton>
        </div>
    )
}

const mapStateToProps = (state) => ({
    cartItems: selectCartItems(state)
})

export default connect(mapStateToProps, null)(CartDropdown)