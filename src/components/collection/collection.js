import React from "react";
import "./collection.scss"
import CollectionItem from "../collection-item/collection-item";
import {connect} from "react-redux";
import { selectShopCollections} from "../../redux/shop/shop.selector";
import { useParams } from "react-router-dom";

const COLLECTION_ID_MAP = {
    hats: 1,
    sneakers: 2,
    jackets: 3,
    womens: 4,
    mens: 5
}


const CollectionPage = ({ collections }) => {
    const param = useParams()
    const { title, items } = collections.find((collection)=> collection.id === COLLECTION_ID_MAP[param["categoryId"]])
    return (
        <div className="collection-page">
            <h2 className="title">{title}</h2>
            <div className="items">
                {
                    items.map(item => <CollectionItem key={item.id} item={item}/>)
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    collections: selectShopCollections(state)
})

export default connect(mapStateToProps, null)(CollectionPage)