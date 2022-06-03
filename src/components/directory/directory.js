import React from "react";
import "./directory.scss"
import MenuItem from "../menu-items/menu-item";
import { connect } from "react-redux";
import {createStructuredSelector} from "reselect";
import { selectDirectorySections } from "../../redux/directory/directory.selector";

function Directory({ sections }){
    return(
        <div className="directory-menu">
            {
                sections.map((section) => (
                    <MenuItem key={section.id} title={section.title} imageUrl={section.image}/>
                ))
            }
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    sections: selectDirectorySections
})

export default connect(mapStateToProps, null)(Directory)