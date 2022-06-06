import React from "react";
import "./collection.scss"
import CollectionItem from "../collection-item/collection-item";
import {connect} from "react-redux";
import {selectCollection} from "../../redux/shop/shop.selector";
import { useParams } from "react-router-dom";


const CollectionPage = ({ collections }) => {
    const param = useParams()
    const data = collections[param["categoryId"]]
    return (
        <div className="collection-page">
            <h2 className="title">{data?.title}</h2>
            <div className="items">
                {
                    data?.items?.map(item => <CollectionItem key={item.id} item={item}/>)
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    collections: selectCollection(state)
})

export default connect(mapStateToProps, null)(CollectionPage)