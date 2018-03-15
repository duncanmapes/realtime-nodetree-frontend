
const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
}

const generateId = () => {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}


const appConfig = (state = {}, action) => {

    


    switch (action.type) {
        case 'OPEN_MODAL':

            let id;
            if(action.newNode){
                id = generateId();
            }else{
                id = action.id;
            }

            return Object.assign({}, state, {      
                    modalShow: true,
                    activeModel: id,
                    modalState:{
                        ...state.modalState,
                        isNew: action.newNode,
                        id: id
                    }
            })
            case 'CLOSE_MODAL':
            return Object.assign({}, state, {      
                    modalShow: false
            })
            case 'UPDATE_TEMP':

            return Object.assign({}, state, {      
                    modalState:{
                        ...state.modalState,
                        [action.field]: action.value
                    }
            })

            case 'UPDATE_TEMP_CHILDREN':

            return Object.assign({}, state, {      
                    modalState:{
                        ...state.modalState,
                        children: action.value
                    }
            })

            case 'PRIME_TEMP':

            return Object.assign({}, state, {      
                    modalState:action
            })

            case 'CLEAR_TEMP':

            return Object.assign({}, state, {      
                    modalState:action
            })

            
        default:
            return state
    }
}

export default appConfig;