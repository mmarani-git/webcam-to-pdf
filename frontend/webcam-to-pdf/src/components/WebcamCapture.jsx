import PubSub from 'pubsub-js'
import React, { Component } from 'react'
import Webcam from 'react-webcam'
import ScreenshootPreview from './ScreenshootPreview'
import './WebcamCapture.css'
import ImageService from '../services/ImageService.js'

export default class WebcamCapture extends Component {
    constructor(props) {
        super(props)
        this.state = {
            deviceId: this.props.match.params.deviceId,
            screenshoots: []
        }

        this._webcam = React.createRef()
        this._screenshootPreview = React.createRef()
    }

    render() {
        return (
            <div>
                <p>Screenshoots: {this.state.screenshoots.length}</p>    
                <Webcam id="webcam" 
                    ref={this._webcam} 
                    forceScreenshotSourceSize="true"
                     audio={false} 
                     videoConstraints={{
                        deviceId: this.state.deviceId,
                        width: {ideal: 10000}, 
                        height: {ideal: 10000}
                }} />
                <ScreenshootPreview ref={this._screenshootPreview} />
            </div>
        )
    }

    _keyPressed(event) {
        if (event.keyCode === 32) {
            PubSub.publish("snapshot")
        }
    }

    subscribeSnapshot(msg, data) {
        if (msg === "") {
            return
        }
        
        let currentSnaps = this.state.screenshoots;
        let snapshot = this._webcam.current.getScreenshot();
        currentSnaps.push(snapshot);

        this.setState({screenshoots : currentSnaps})
        this._screenshootPreview.current.addScreenshoot(snapshot)
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