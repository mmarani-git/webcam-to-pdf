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

    _willShowSaveDialog = () => {
        return this.state.showSaveDialog === true 
            && this._saveDialog !== undefined
            && this._saveDialog !== null
            && this._saveDialog.current !== undefined
            && this._saveDialog.current !== null
    }

    render() {
        if (this._willShowSaveDialog()) {
            this._saveDialog.current.reset()
        }
 
        this._deviceId = this.props.location.state.deviceId
        this._imageFormat = this.props.location.state.imageFormat

        return (
            <div>
                <SaveDialog ref={this._saveDialog} show={this.state.showSaveDialog} />
                <div className="row">
                    <div className="width50">
                        <Webcam id="webcam"
                            ref={this._webcam}
                            forceScreenshotSourceSize="true"
                            screenshotFormat={this._imageFormat}
                            audio={false}
                            videoConstraints={{
                                deviceId: this._deviceId,
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
            PubSub.publish(WCEvents.SHOW_SAVE_DIALOG)
        }
    }

    _addKeydownListener() {
        document.addEventListener("keydown", this._keyPressed, false);
    }

    _removeKeydownListener() {
        document.removeEventListener("keydown", this._keyPressed, false);
    }

    //Events mgmt
    _subscribeSnapshot(msg, data) {
        if (msg === "") {
            return
        }

        let image = this._webcam.current.getScreenshot();
        this._filterPane.current.addScreenshoot(image)
    }

    _subscribeSave(msg, data) {
        if (msg === "") {
            return
        }

        //Actual saving is done by ScreenshootBar
        this._hideSaveDialog()
    }

    _subscribeShowSaveDialog(msg, data) {
        if (msg === ""
            || this.state.showSaveDialog === true
            || this._screenshootBar.current.getScreenshoots().length === 0) {
            return
        }

        this._showSaveDialog()
    }

    //SaveDialog
    _hideSaveDialog() {
        this.setState({ showSaveDialog: false })
        document.addEventListener("keydown", this._keyPressed, false);
        document.removeEventListener("keydown", this._saveDialog.current.keyPressed, false);
    }

    _showSaveDialog() {
        this.setState({ showSaveDialog: true })
        document.removeEventListener("keydown", this._keyPressed, false);
        document.addEventListener("keydown", this._saveDialog.current.keyPressed, false);
    }

    //Lifecycle methods
    componentDidMount() {
        this._addKeydownListener()

        this._snapshotSubscriptionToken = PubSub.subscribe(WCEvents.NEW_SCREENSHOOT, this._subscribeSnapshot.bind(this));
        this._saveSubscriptionToken = PubSub.subscribe(WCEvents.SAVE, this._subscribeSave.bind(this));
        this._showSaveDialogSubscriptionToken = PubSub.subscribe(WCEvents.SHOW_SAVE_DIALOG, this._subscribeShowSaveDialog.bind(this));
        this._subscribeSnapshot("", "")
        this._subscribeSave("", "")
        this._subscribeShowSaveDialog("", "")
    }

    componentWillUnmount() {
        this._removeKeydownListener();
        PubSub.unsubscribe(this._snapshotSubscriptionToken)
        PubSub.unsubscribe(this._saveSubscriptionToken)
        PubSub.unsubscribe(this._showSaveDialogSubscriptionToken)
    }
}