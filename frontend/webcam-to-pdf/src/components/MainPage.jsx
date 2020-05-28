import React, { Component } from 'react'
import WebcamCapture from './WebcamCapture'

export default class MainPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            deviceId: this.props.match.params.deviceId,
        }
    }

    render() {
        return (<div className="row">
            <WebcamCapture className="width50" deviceId={this.state.deviceId} />
            <div className="width50">preview<br/>with controls</div>
        </div>
        )
    }
}