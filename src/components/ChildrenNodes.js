import React from 'react'
import PropTypes from 'prop-types'

const ChildrenNodes = ({ data }) => (
    <li key={data.id}>{data}</li>   
);




 
// Todo.propTypes = {
//   onClick: PropTypes.func.isRequired,
//   completed: PropTypes.bool.isRequired,
//   text: PropTypes.string.isRequired
// }

export default ChildrenNodes;
