import React from "react";
import "./header.scss"
import { createStructuredSelector } from "reselect"
import { useNavigate } from "react-router-dom"
import { ReactComponent as Logo } from "../../assests/4.3 crown.svg.svg"
import { connect } from "react-redux";
import { auth } from "../../firebase"
import { signOut } from "firebase/auth"
import CartIcon from "../cart-icons/cart-icon";
import CartDropdown from "../cart-dropdown/cart-dropdown";
import { selectCartHidden} from "../../redux/cart/cart.selector";
import {selectCurrentUser} from "../../redux/user/user.selector";
import { OptionDiv, OptionsContainer, HeaderContainer, LogoContainer, OptionLink } from "./header.styles"

const Header = (props) => {
    const currentUser = props.currentUser
    const history = useNavigate()
    const hidden = props.hidden
    const handleAuthentication = ()=>{
        if(currentUser){
            signOut(auth).then((user)=>{
                history("/")
            })
        }
    }
    return(
        <HeaderContainer>
            <LogoContainer to="/" className="logo-container">
                <Logo className="logo"/>
            </LogoContainer>

            <OptionsContainer>
                <OptionLink  to="/shop">Shop</OptionLink>
                <OptionLink  to="/shop">Contact</OptionLink>
                {
                    currentUser ? (
                        <OptionDiv onClick={handleAuthentication}>Sign Out</OptionDiv>
                    ): (
                        <OptionLink to="/signIn">Sign In</OptionLink>
                    )
                }
                <CartIcon />
            </OptionsContainer>
            {
                !hidden && <CartDropdown/>
            }
        </HeaderContainer>
    )
}

const mapStateToProps = createStructuredSelector ({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

export default connect(mapStateToProps, null)(Header)