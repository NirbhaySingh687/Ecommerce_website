import React, {Component} from "react"
import './App.css';
import { Route, Routes } from "react-router-dom"
import { createStructuredSelector} from "reselect";
import Homepage from "./pages/homepage/Homepage";
import Shop from "./pages/shop/shop";
import Header from "./components/header/header";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up";
import { connect} from "react-redux";
import {auth, covertCollectionsSnapshotToMap, createUserProfileDocument, fireStore} from "./firebase";
import { onAuthStateChanged } from "firebase/auth"
import { setCurrentUser } from "./redux/user/user.action"
import { selectCurrentUser } from "./redux/user/user.selector";
import CheckoutPage from "./pages/checkout/checkout";
import CollectionPage from "./components/collection/collection";
import {collection, getDocs} from "firebase/firestore";
import {updateCollections} from "./redux/shop/shop.actions";
import withSpinner from "./components/with-spinner/With-Spinner";

const CollectionPageWithSpinner = withSpinner(CollectionPage)

class App extends Component{
    state = {
        loading : true
    }
    componentDidMount = async () =>{
        this.unsubcribeFromAuth = onAuthStateChanged(auth, async user => {
            if(user){
                this.props.setCurrentUser({
                    id: user.uid,
                    ...user
                })
                await createUserProfileDocument(user)
            }
        })
        const { updateCollections } = this.props
        const querySnapshot = await getDocs(collection(fireStore, "collections"));
        const collectionMap = covertCollectionsSnapshotToMap(querySnapshot)
        updateCollections(collectionMap)
        this.setState({ loading: false })
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
                  <Route exact path="/shop/:categoryId" element={
                      <CollectionPageWithSpinner isLoading={this.state.loading}>
                          <CollectionPage />
                      </CollectionPageWithSpinner>
                  }/>
              </Routes>
          </div>
      );
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
})

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user)),
    updateCollections: collectionMap => dispatch(updateCollections(collectionMap))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
