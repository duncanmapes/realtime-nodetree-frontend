const nodes = (state = [], action) => {
    switch (action.type) {
        case 'ADD_NODE':
            return [
                ...state, {
                    id: action.id,
                    title: action.title,
                    childrenCount: action.childrenCount,
                    rangeHigh: action.rangeHigh,
                    rangeLow: action.rangeLow,
                    children:action.children
                }
            ]

            case 'REMOVE_ALL_NODES':
            return []

            

            case 'UPDATE_NODE':
            const index = state.findIndex(node => node.id === action.id);
            return [
                ...state.slice(0, index), // everything before current node
                {
                    id: action.id,
                    title: action.title,
                    childrenCount: action.childrenCount,
                    rangeHigh: action.rangeHigh,
                    rangeLow: action.rangeLow,
                    children:action.children
                },
                ...state.slice(index + 1), // everything after current node
            ]

            case 'REMOVE_NODE':
            const removeIndex = state.findIndex(node => node.id === action.id);
            return [
                ...state.slice(0, removeIndex), 
                ...state.slice(removeIndex + 1),
            ]

            case 'fullNodeUpdate':
            console.log("fullNodeUpdate", action);
            return action.data.nodes
   
        default:
            return state
    }
}

export default nodes