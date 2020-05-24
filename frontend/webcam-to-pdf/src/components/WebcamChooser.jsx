import React, { Component } from 'react'
import Webcam from 'react-webcam'
import { Link } from 'react-router-dom'

export default class WebcamChooser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedDeviceId: "",
            devices: []
        }
    }

    componentDidMount() {
        navigator.mediaDevices.enumerateDevices().then(
            (mediaDevices) => this.setState(
                { devices: mediaDevices.filter(({ kind }) => kind === "videoinput") }
            )
        );
    }

    render() {
        return (
            <>
            { this.state.devices.map((device, key) => (
                  <WebcamRow device={device} key={key} />
              )) }
            </>
        )
    }
}

class WebcamRow extends Component {
    constructor(props) {
        super(props)
        this.state = { selected: false }
    }

    render() {
        return (
            <Link to={"/capture/"+this.props.device.deviceId}>
                <Webcam audio={false} videoConstraints={{ deviceId: this.props.device.deviceId }} />
                <p>{ this.props.device.label}</p>
            </Link>
        )
    }

    _selectDevice = () => {
        window.confirm(this.props.device.label)
    }
}