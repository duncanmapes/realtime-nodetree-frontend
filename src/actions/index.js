export const addNewNode = data => {
    return {
        type: 'ADD_NODE',
        id: data.id,
        title: data.title,
        childrenCount: data.childrenCount,
        rangeHigh: data.rangeHigh,
        rangeLow: data.rangeLow,
        children: data.children
    }
}

export const clearAllNodes = () => {
    return {
        type: 'REMOVE_ALL_NODES'
    }
}

export const updateNode = data => {
    return {
        type: 'UPDATE_NODE',
        id: data.id,
        title: data.title,
        childrenCount: data.childrenCount,
        rangeHigh: data.rangeHigh,
        rangeLow: data.rangeLow,
        children: data.children
    }
}

export const primeTempState = data => {
    return {
        type: 'PRIME_TEMP',
        isNew: false,
        id: data.id,
        title: data.title,
        childrenCount: data.childrenCount,
        rangeHigh: data.rangeHigh,
        rangeLow: data.rangeLow,
        children: data.children
    }
}

export const clearTemp = data => {
    return {
        type: 'CLEAR_TEMP',
        isNew: true,
        id: null,
        title: '',
        childrenCount: null,
        rangeHigh: 1,
        rangeLow: 1,
        children: []
    }
}

export const removeNode = (id) => {
    return {type: 'REMOVE_NODE', id}
}

export const updateTempForm = (field, value) => {
    return {type: 'UPDATE_TEMP', field, value}
}

export const updateTempChildren = (field, value) => {
    return {type: 'UPDATE_TEMP_CHILDREN', value: value}
}

export const openModal = (id, newNode = true) => {
    return {type: 'OPEN_MODAL', modalShow: true, id, newNode}
}

export const closeModal = index => {
    return {type: 'CLOSE_MODAL', modalShow: false}
}

export const serverMessage = (data) => {
    return {
        type: 'MESSAGE', data
    }
}
