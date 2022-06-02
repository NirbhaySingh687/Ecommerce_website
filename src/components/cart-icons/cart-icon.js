import React from "react";
import { ReactComponent as ShoppingIcons} from "../../assests/11.2 shopping-bag.svg.svg";
import "./cart-icons.scss"
import { connect } from "react-redux";
import { toggleCartHidden } from "../../redux/cart/cart.action";
import { selectCartItemCount } from "../../redux/cart/cart.selector"

const CartIcon = ({ toggleCartHidden, itemCount }) => {
    return (
        <div className="cart-icon" onClick={toggleCartHidden}>
            <ShoppingIcons className="shopping-icon"/>
            <span className="item-count">{itemCount }</span>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
})

const mapStateToProps = (state) => ({
    itemCount: selectCartItemCount(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon)