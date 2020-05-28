import React, { Component } from 'react'
import WebcamCapture from './WebcamCapture'
import CamanPane from './CamanPane'

export default class MainPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            deviceId: this.props.match.params.deviceId,
        }
    }

    render() {
        return (<div className="row">
            <div className="width50"><WebcamCapture deviceId={this.state.deviceId} /></div>
            <div className="width50"><CamanPane/></div>
        </div>
        )
    }
}