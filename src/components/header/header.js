import React from "react";
import "./header.scss"
import { createStructuredSelector } from "reselect"
import { Link } from "react-router-dom"
import { ReactComponent as Logo } from "../../assests/4.3 crown.svg.svg"
import { connect } from "react-redux";
import { auth } from "../../firebase"
import { signOut } from "firebase/auth"
import CartIcon from "../cart-icons/cart-icon";
import CartDropdown from "../cart-dropdown/cart-dropdown";
import { selectCartHidden} from "../../redux/cart/cart.selector";
import {selectCurrentUser} from "../../redux/user/user.selector";

const Header = (props) => {
    const currentUser = props.currentUser
    const hidden = props.hidden
    const handleAuthentication = ()=>{
        if(currentUser){
            signOut(auth).then((user)=>{
                console.log(`#After SignOut-->>`,user)
            })
        }
    }
    return(
        <div className="header">
            <Link to="/" className="logo-container">
                <Logo className="logo"/>
            </Link>

            <div className="options">
                <Link className="option" to="/shop">Shop</Link>
                <Link className="option" to="/shop">Contact</Link>
                {
                    currentUser ? (
                        <div className="option" onClick={handleAuthentication}>Sign Out</div>
                    ): (
                        <Link className="option" to="/signIn">Sign In</Link>
                    )
                }
                <CartIcon />
            </div>
            {
                !hidden && <CartDropdown/>
            }
        </div>
    )
}

const mapStateToProps = createStructuredSelector ({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

export default connect(mapStateToProps, null)(Header)