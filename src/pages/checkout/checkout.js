import React from "react";
import "./checkout.scss"
import { connect} from "react-redux";
import { createStructuredSelector} from "reselect";
import { selectCartItems, selectCartTotal } from "../../redux/cart/cart.selector";
import CheckoutItem from "../../components/checkout-item/checkout-item";

const CheckoutPage = ({ cartItem, total }) => {
    return (
        <div className="checkout-page">
            <div className="checkout-header">
                <div className="header-block">
                    <span>Product</span>
                </div>
                <div className="header-block">
                    <span>Description</span>
                </div>
                <div className="header-block">
                    <span>Quantity</span>
                </div>
                <div className="header-block">
                    <span>Price</span>
                </div>
                <div className="header-block">
                    <span>Remove</span>
                </div>
            </div>
            {
                cartItem?.map((item, index) => {
                    return <CheckoutItem key={index} cartItem={item}/>
                })
            }
            <div className="total">
                <span>Total: ${total || 0}</span>
            </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    cartItem: selectCartItems,
    total: selectCartTotal
})

export default connect(mapStateToProps, null)(CheckoutPage)