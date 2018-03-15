import React, {Component} from 'react'
import {connect} from 'react-redux'
import {openModal, closeModal, clearAllNodes} from '../actions'
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';

class TopMenu extends Component {

    render() {
        
        return (
            <IconMenu
            iconButtonElement={< IconButton > <MoreVertIcon/> </IconButton>}
            targetOrigin={{
            horizontal: 'right',
            vertical: 'top'
        }}
            anchorOrigin={{
            horizontal: 'right',
            vertical: 'top'
        }}>
            <MenuItem primaryText="Add New Node" onClick={this.props.addNewNodeHandler}/>
            <MenuItem primaryText="Clear All" onClick={this.props.removeNodesHandler}/>
        </IconMenu>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addNewNodeHandler: () => {
            dispatch(openModal(null,true));
        },
        removeNodesHandler: () => {
            dispatch({type:'server/deleteAll'})
            //dispatch(clearAllNodes());
        }
    }
}

export default connect(null, mapDispatchToProps)(TopMenu);
