import React from "react";
import "./menu-item.scss"
import { useNavigate } from "react-router-dom";

function MenuItem({ title,imageUrl, ...otherProps}){
    const history = useNavigate()
    return(
        <div className="menu-item">
            <div style={{backgroundImage: `url(${imageUrl})`}} className="background-image"/>
            <div className="content">
                <h1 className="title">{title}</h1>
                <span className="subtitle" onClick={() => history(`${otherProps.linkUrl}`)}>Shop Now</span>
            </div>
        </div>
    )
}

export default MenuItem;