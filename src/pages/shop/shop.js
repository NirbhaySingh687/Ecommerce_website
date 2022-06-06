import React, {Component} from "react";
import CollectionOverview from "../../components/collection-overview/collection-overview";
import { fireStore, covertCollectionsSnapshotToMap } from "../../firebase";
import { collection, getDocs } from "firebase/firestore"
import { connect } from "react-redux";
import { updateCollections } from "../../redux/shop/shop.actions";

class shop extends Component{

    componentDidMount = async ()=> {
        const { updateCollections } = this.props
        const querySnapshot = await getDocs(collection(fireStore, "collections"));
        const collectionMap = covertCollectionsSnapshotToMap(querySnapshot)
        updateCollections(collectionMap)
    }

    render() {
        return(
            <div className="shop-page">
                <CollectionOverview  />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionMap => dispatch(updateCollections(collectionMap))
})


export default connect(null, mapDispatchToProps)(shop)