import React from "react";
import "./menu-item.scss"

function MenuItem({ title,imageUrl}){
    return(
        <div className="menu-item">
            <div style={{backgroundImage: `url(${imageUrl})`}} className="background-image"/>
            <div className="content">
                <h1 className="title">{title}</h1>
                <span className="subtitle">Shop Now</span>
            </div>
        </div>
    )
}

export default MenuItem;