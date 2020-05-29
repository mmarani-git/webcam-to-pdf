import PubSub from 'pubsub-js'
import React, { Component } from 'react'
import Webcam from 'react-webcam'
import ScreenshootBar from './ScreenshootBar'
import './WebcamCapture.css'
import { WCEvents } from '../misc/WCEvents.js'
import SaveDialog from './SaveDialog.jsx'
import FilterPane from './FilterPane'

export default class WebcamCapture extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showSaveDialog: false
        }

        this._processing = false;
        this._webcam = React.createRef()
        this._screenshootBar = React.createRef()
        this._filterPane = React.createRef();
        this._saveDialog = React.createRef();
    }

    willShowSaveDialog = () => {
        return this.state.showSaveDialog === true 
            && this._saveDialog !== undefined
            && this._saveDialog !== null
            && this._saveDialog.current !== undefined
            && this._saveDialog.current !== null
    }

    render() {
        if (this.willShowSaveDialog()) {
            this._saveDialog.current.reset()
        }

        return (
            <div>
                <SaveDialog ref={this._saveDialog} show={this.state.showSaveDialog} />
                <div className="row">
                    <div className="width50">
                        <Webcam id="webcam"
                            ref={this._webcam}
                            forceScreenshotSourceSize="true"
                            screenshotFormat="image/png"
                            audio={false}
                            videoConstraints={{
                                deviceId: this.props.match.params.deviceId,
                                width: { ideal: 10000 },
                                height: { ideal: 10000 }
                            }} />
                    </div>
                    <div className="width50"><FilterPane ref={this._filterPane} /></div>
                </div>
                <ScreenshootBar ref={this._screenshootBar} />
            </div>
        )
    }

    //Keypressed management
    _keyPressed(event) {
        if (event.keyCode === 32) {
            PubSub.publish(WCEvents.NEW_SCREENSHOOT)
        } else if (event.keyCode === 13) {
            PubSub.publish(WCEvents.ENTER_PRESSED)
        }
    }

    addKeydownListener() {
        document.addEventListener("keydown", this._keyPressed, false);
    }

    removeKeydownListener() {
        document.removeEventListener("keydown", this._keyPressed, false);
    }

    //Events mgmt
    subscribeSnapshot(msg, data) {
        if (msg === "") {
            return
        }

        let image = this._webcam.current.getScreenshot();
        this._filterPane.current.addScreenshoot(image)
    }

    subscribeSave(msg, data) {
        if (msg === "") {
            return
        }

        //Actual saving is done by ScreenshootBar
        this.hideSaveDialog()
    }

    subscribeEnterPressed(msg, data) {
        if (msg === ""
            || this.state.showSaveDialog === true
            || this._screenshootBar.current.getScreenshoots().length === 0) {
            return
        }

        this.showSaveDialog()
    }

    //SaveDialog
    hideSaveDialog() {
        this.setState({ showSaveDialog: false })
        document.addEventListener("keydown", this._keyPressed, false);
    }

    showSaveDialog() {
        this.setState({ showSaveDialog: true })
        document.removeEventListener("keydown", this._keyPressed, false);
    }

    //Lifecycle methods
    componentDidMount() {
        this.addKeydownListener()

        PubSub.subscribe(WCEvents.NEW_SCREENSHOOT, this.subscribeSnapshot.bind(this));
        PubSub.subscribe(WCEvents.SAVE, this.subscribeSave.bind(this));
        PubSub.subscribe(WCEvents.ENTER_PRESSED, this.subscribeEnterPressed.bind(this));
        this.subscribeSnapshot("", "")
        this.subscribeSave("", "")
        this.subscribeEnterPressed("", "")
    }

    componentWillUnmount() {
        this.removeKeydownListener();
    }
}