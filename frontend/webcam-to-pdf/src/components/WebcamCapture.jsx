import PubSub from 'pubsub-js'
import React, { Component } from 'react'
import Webcam from 'react-webcam'
import ScreenshootBar from './ScreenshootBar'
import './WebcamCapture.css'
import { WCEvents } from '../misc/WCEvents.js'

export default class WebcamCapture extends Component {
    constructor(props) {
        super(props)
        this.state = {
            deviceId: this.props.match.params.deviceId
        }

        this._processing=false;
        this._webcam = React.createRef()
        this._screenshootBar = React.createRef()
    }

    render() {
        return (
            <div>
                <Webcam id="webcam" 
                    ref={this._webcam} 
                    forceScreenshotSourceSize="true"
                     audio={false} 
                     videoConstraints={{
                        deviceId: this.state.deviceId,
                        width: {ideal: 10000}, 
                        height: {ideal: 10000}
                }} />
                <ScreenshootBar ref={this._screenshootBar} />
            </div>
        )
    }

    _keyPressed(event) {
        if (event.keyCode === 32 && !this._processing) {
            PubSub.publish(WCEvents.NEW_SCREENSHOOT)
        }
    }

    subscribeSnapshot(msg, data) {
        if (msg === "") {
            return
        }
        
        this._processing = true;
        this._screenshootBar.current.addScreenshoot(this._webcam.current.getScreenshot())
        this._processing = false;
    }

    componentDidMount() {
        document.addEventListener("keydown", this._keyPressed, false);
        
        PubSub.subscribe(WCEvents.NEW_SCREENSHOOT, this.subscribeSnapshot.bind(this));
        this.subscribeSnapshot("", "")
    }    

    componentWillUnmount() {
        document.removeEventListener("keydown", this._keyPressed, false);
    }
}