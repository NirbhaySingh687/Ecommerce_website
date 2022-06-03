import React from "react";
import "./collection-overview.scss"
import { connect} from "react-redux";
import { createStructuredSelector } from "reselect";
import CollectionPreview from "../preview-collection/preview-collection";
import {selectShopCollections} from "../../redux/shop/shop.selector";


const CollectionOverview = ({ collections }) => (
    <div className="collection-overview">
        {
            collections.map(({ id, ...otherCollection}) => (
                <CollectionPreview key={id} { ...otherCollection} />
            ))
        }
    </div>
)

const mapStateToProps = createStructuredSelector({
    collections: selectShopCollections
})

export default connect(mapStateToProps, null)(CollectionOverview)