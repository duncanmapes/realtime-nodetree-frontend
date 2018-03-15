import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar';
import TopMenu from '../containers/TopMenu';

let style = { letterSpacing: 1};

const RootNode = () => (

        <AppBar
            titleStyle = {style}
            title="Realtime NodeTree"
            iconClassNameLeft="hideme"
            iconElementRight={<TopMenu label = "Login" />}
        />
);

export default RootNode