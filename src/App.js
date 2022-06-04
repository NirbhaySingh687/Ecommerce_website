import React, {Component} from "react"
import './App.css';
import { Route, Routes } from "react-router-dom"
import { createStructuredSelector} from "reselect";
import Homepage from "./pages/homepage/Homepage";
import Shop from "./pages/shop/shop";
import Header from "./components/header/header";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up";
import { connect} from "react-redux";
import {auth, createUserProfileDocument} from "./firebase";
import { onAuthStateChanged } from "firebase/auth"
import { setCurrentUser } from "./redux/user/user.action"
import { selectCurrentUser } from "./redux/user/user.selector";
import CheckoutPage from "./pages/checkout/checkout";
import CollectionPage from "./components/collection/collection";

class App extends Component{

    componentDidMount() {
        this.unsubcribeFromAuth = onAuthStateChanged(auth, async user => {
            if(user){
                this.props.setCurrentUser({
                    id: user.uid,
                    ...user
                })
                await createUserProfileDocument(user)
            }
        })
    }

    componentWillUnmount() {
        this.unsubcribeFromAuth()
    }

    render() {
      return (
          <div>
              <Header />
              <Routes>
                  <Route exact path="/" element={<Homepage />} />
                  <Route exact path="/shop" element={<Shop />}/>
                  <Route exact path="/signIn" element={<SignInAndSignUp />}/>
                  <Route exact path="/checkout" element={<CheckoutPage />}/>
                  //<Route exact path="/shop/:categoryId" element={<CollectionPage />}/>
              </Routes>
          </div>
      );
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
