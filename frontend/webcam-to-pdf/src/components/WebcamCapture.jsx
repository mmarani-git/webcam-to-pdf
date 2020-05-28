import PubSub from 'pubsub-js'
import React, { Component } from 'react'
import Webcam from 'react-webcam'
import ScreenshootBar from './ScreenshootBar'
import './WebcamCapture.css'
import { WCEvents } from '../misc/WCEvents.js'
import SaveDialog from './SaveDialog.jsx'
import CamanPane from './CamanPane'

export default class WebcamCapture extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showSaveDialog: false
        }

        this._processing = false;
        this._webcam = React.createRef()
        this._screenshootBar = React.createRef()
    }

    render() {
        return (
            <div>
                <SaveDialog show={this.state.showSaveDialog} />
                <div className="row">
                    <div className="width50">
                        <Webcam id="webcam"
                            ref={this._webcam}
                            forceScreenshotSourceSize="true"
                            screenshotFormat="image/jpeg"
                            audio={false}
                            videoConstraints={{
                                deviceId: this.props.match.params.deviceId,
                                width: { ideal: 10000 },
                                height: { ideal: 10000 }
                            }} />
                    </div>
                    <div className="width50"><CamanPane /></div>
                </div>
                <ScreenshootBar ref={this._screenshootBar} />
            </div>
        )
    }

    _keyPressed(event) {
        if (this._processing) {
            return;
        }

        if (event.keyCode === 32) {
            PubSub.publish(WCEvents.NEW_SCREENSHOOT)
        } else if (event.keyCode === 13) {
            PubSub.publish(WCEvents.ENTER_PRESSED)
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

    subscribeSave(msg, data) {
        if (msg === "") {
            return
        }

        //Actual saving is done by ScreenshootBar
        this.setState({ showSaveDialog: false })
    }

    subscribeEnterPressed(msg, data) {
        if (msg === ""
            || this.state.showSaveDialog === true
            || this._screenshootBar.current.getScreenshoots().length === 0) {
            return
        }

        this.setState({ showSaveDialog: true })
    }

    componentDidMount() {
        document.addEventListener("keydown", this._keyPressed, false);

        PubSub.subscribe(WCEvents.NEW_SCREENSHOOT, this.subscribeSnapshot.bind(this));
        PubSub.subscribe(WCEvents.SAVE, this.subscribeSave.bind(this));
        PubSub.subscribe(WCEvents.ENTER_PRESSED, this.subscribeEnterPressed.bind(this));
        this.subscribeSnapshot("", "")
        this.subscribeSave("", "")
        this.subscribeEnterPressed("", "")
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this._keyPressed, false);
    }
}