import React from 'react'

import RootNode from './RootNode'
import ParentNodeList from './ParentNodeList'
import EditTree from '../containers/EditTree'
// import VisibleTodoList from '../containers/VisibleTodoList'
 
const App = () => (
  <div>
    <EditTree />
    <RootNode />  
    <ParentNodeList />
  </div>
)
 
export default App