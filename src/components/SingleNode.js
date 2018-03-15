import React, {Component} from 'react'
import {connect} from 'react-redux'
import ChildrenNodes from './ChildrenNodes'
import IconButton from 'material-ui/IconButton';
import ActionBuild from 'material-ui/svg-icons/action/build';
import ContentClear from 'material-ui/svg-icons/content/clear';

import {openModal, closeModal, primeTempState, removeNode} from '../actions'

class SingleNode extends Component {  

    handleClick = (e) =>{
        e.preventDefault();
        let obj = _.find(this.props.fullState.nodes, {'id':this.props.data.id});
        this.props.editNodeHandler(this.props.data.id,obj);
    }

    handleDelete = (e) => {
        this.props.removeNodeHandler(this.props.data.id);
    }

    render() {
        let children = this.props.data.children;
        const buttonStyle = {
            color:'#ffffff',
            width:15
        }
        return (
            <li className="title-node"  key={this.props.data.id + '-name'}>
            <div className="title-box">{this.props.data.title} 
           
            <button className="edit-button"><ActionBuild style={buttonStyle} onClick={this.handleClick} /></button>
            <button className="delete-button"><ContentClear style={buttonStyle} onClick={this.handleDelete} /></button></div>
                <ul>
                    {children.map((node) => (
                        /* probably need a better key value, since this could theoretically not yeild a unique value */
                         <li key={node + '-' +  this.props.data.title} >{node}</li> 
                    ))}
                </ul>
                
            </li>
        );
    }
}

const mapStateToProps = (state) => {
    return { fullState: state};
};

const mapDispatchToProps = (dispatch) => {
    return {
        editNodeHandler: (id,node) => {
            dispatch(primeTempState(node));
            dispatch(openModal(id,false));
        },
        removeNodeHandler:(id)=>{
            dispatch({type:'server/deleteNode', data:id});
            //dispatch(removeNode(id));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SingleNode);
//export default (SingleNode);
