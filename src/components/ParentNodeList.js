import React, {Component} from 'react'
import {connect} from 'react-redux'
import SingleNode from './SingleNode'

class ParentNodeList extends Component {  

    render() {

        let nodes = this.props.nodes;

        return (
            <div className="node-tree">
                <ul className="parent-list">
                    {nodes.map((node, index) => (
                        <SingleNode key={node.id} data={node} />
                    ))}
                </ul>
            </div>
        );
    }
}
// start of code change
const mapStateToProps = (state) => {
    return {nodes: state.nodes};
};

export default connect(mapStateToProps)(ParentNodeList);
