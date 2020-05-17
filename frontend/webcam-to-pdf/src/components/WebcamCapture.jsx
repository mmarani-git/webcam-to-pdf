import PubSub from 'pubsub-js'
import React, { Component } from 'react'
import Webcam from 'react-webcam'
import useParams from "react-router-dom";

export default class WebcamCapture extends Component {
    constructor(props) {
        super(props)
        this.state = {
            deviceId: this.props.match.params.deviceId,
            screenshoots: []
        }

        this._webcam = React.createRef()
    }

    render() {
        return (
            <div>
                <p>Screenshoots: {this.state.screenshoots.length}</p>    
                <Webcam ref={this._webcam} audio={false} videoConstraints={{
                    deviceId: this.state.deviceId,
                    forceScreenshotSourceSize: true
                }} />
            </div>
        )
    }

    _keyPressed(event) {
        if (event.keyCode === 32) {
            PubSub.publish("snapshot")
        }
    }

    subscribeSnapshot(msg, data) {
        if (msg == "") {
            return
        }
        
        let currentSnaps = this.state.screenshoots;
        currentSnaps.push(this._webcam.current.getScreenshot());

        this.setState({screenshoots : currentSnaps})
    }

    componentDidMount() {
        document.addEventListener("keydown", this._keyPressed, false);
        
        PubSub.subscribe("snapshot", this.subscribeSnapshot.bind(this));
        this.subscribeSnapshot("", "")
    }    

    componentWillUnmount() {
        document.removeEventListener("keydown", this._keyPressed, false);
    }
}