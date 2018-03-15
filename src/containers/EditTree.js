import React, {Component} from 'react'
import {connect} from 'react-redux'
import {openModal, closeModal, updateTempForm, updateTempChildren, primeTempState, updateNode, clearTemp} from '../actions'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import Slider from 'material-ui/Slider';

import {addNewNode} from '../actions';

import _ from 'lodash';

class EditTree extends Component {

    
   
    handleSliderMax = (event, value) => {
        this.props.handleFormChange('rangeHigh', value);
    };

    handleSliderMin = (event, value) => {
        this.props.handleFormChange('rangeLow', value);
    };

    handleChange = (event, index, value) => {
        this.props.handleFormChange('childrenCount', value);
    };

    handleTitleChange = (event, value) => {
        this.props.handleFormChange('title', value);
    };

    updateChildren = (numbers) => {
        this.props.handleChildren('children', numbers);
    }

    handleSave = (event, value) => {
        let children = this.generateNumberSet(this.props.modalState.childrenCount, this.props.modalState.rangeLow, this.props.modalState.rangeHigh);

        this.updateChildren(children);

        this.props.handleSave(this.props.modalState, children, this.props.modalState.isNew);  
    }


    generateNumberSet = (count, min, max) => {
        let set = []
        for (var i = 0; i < count; i++) {
            set.push(this.generateNumber(min, max));
        }
        return set;
    }

    generateNumber = (min, max) => {
        let minNum = Math.ceil(min);
        let maxNum = Math.floor(max);
        return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
    }
    

    render() {

        // if(!this.props.modalState.id){
        //     this.props.handleFormChange('id', this.generateId());
        // }

        const actions = [ < FlatButton label = "Cancel" primary = {
                true
            }
            onClick = {
                this.props.handleClose
            } />, < FlatButton label = "Save" primary = {
                true
            }
            keyboardFocused = {
                true
            }
            onClick = {
                this.handleSave
            } />
        ];

        const items = [];
        for (let i = 1; i < 16; i++) {
            items.push(<MenuItem value={i} key={i} primaryText={`${i}`}/>);
        }

        let dialogStyle = {
            height: 800
        }

        return (
            <div>
                <Dialog
                    title="Edit A Node"
                    actions={actions}
                    modal={false}
                    open={this.props.modalShow}
                    onRequestClose={this.props.handleClose}
                    autoScrollBodyContent={true}
                    style={dialogStyle}>
                    <TextField
                        hintText="Name This Number Set"
                        floatingLabelText="Set Title"
                        value={this.props.modalState.title}
                        onChange={this.handleTitleChange}/><br/>
                    <SelectField
                        value={this.props.modalState.childrenCount}
                        onChange={this.handleChange}
                        maxHeight={200}
                        hintText="How many numbers to Generate"
                        floatingLabelText="Count of Numbers">
                        {items}
                    </SelectField>

                    <p>
                        <span>{'The min value of this number set is: '}{this.props.modalState.rangeLow}</span>
                    </p>
                    <Slider value={this.props.modalState.rangeLow} onChange={this.handleSliderMin} step={1} min={0} max={100000} />

                    <p>
                        <span>{'The max value of this number set is: '}{this.props.modalState.rangeHigh}</span>
                    </p>

                    <Slider value={this.props.modalState.rangeHigh} onChange={this.handleSliderMax} step={1} min={0} max={100000} />
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    let mState = state.appConfig.modalState;
    return {
        modalShow: state.appConfig.modalShow,
        modalState: {
            isNew:mState.isNew,
            id:mState.id,
            childrenCount: mState.childrenCount,
            rangeHigh: mState.rangeHigh,
            rangeLow: mState.rangeLow,
            title: mState.title,
            children: mState.children
        }
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {

    return {
        handleOpen: (id) => {
            //dispatch(openModal());
            dispatch(primeTempState(node));
            //dispatch(openModal());
        },
        handleClose: (id) => {
            dispatch(closeModal(2));
            dispatch(clearTemp());
        },
        handleFormChange: (field, value) => {
            dispatch(updateTempForm(field, value));
        },
        handleChildren: (field, value) => {
            dispatch(updateTempChildren(field, value));
        },
        
        handleSave: (formState, children, isNew = true) => {
            formState.children = children;
            if(isNew){
                //dispatch(addNewNode(formState));
                dispatch({type:'server/newNode', data:formState});
            }else{
                //dispatch(updateNode(formState));
                dispatch({type:'server/saveNode', data:formState});
            }
            
            dispatch(closeModal());
            dispatch(clearTemp());
        },

        loadModalState: (node) => {
            dispatch(primeTempState(node));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTree);
