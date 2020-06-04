import React, { Component } from 'react'
import Webcam from 'react-webcam'
import { Link } from 'react-router-dom'

export default class WebcamChooser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedDeviceId: "",
            devices: [],
            imageFormat: 'jpeg'
        }
    }

    componentDidMount() {
        navigator.mediaDevices.enumerateDevices().then(
            (mediaDevices) => this.setState(
                { devices: mediaDevices.filter(({ kind }) => kind === "videoinput") }
            )
        );
    }

    _changeImageFormat = (event) => {
        this.setState({imageFormat: event.target.value})
    }

    render() {
        const inputStyle = {
            margin: 10
        }
        return (
            <>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="imageFormat"
                            value="png"
                            checked={this.state.imageFormat === "png"}
                            onChange={this._changeImageFormat}
                            style={inputStyle}
                        />
                    PNG
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="imageFormat"
                            value="jpeg"
                            checked={this.state.imageFormat === "jpeg"}
                            onChange={this._changeImageFormat}
                            style={inputStyle}
                        />
                    JPEG
                    </label>
                </div>
                {this.state.devices.map((device, key) => (
                    <WebcamRow device={device} key={key} imageFormat={this.state.imageFormat} />
                ))}
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
            <Link to={{ 
                pathname: "/capture", 
                state: { 
                    deviceId: this.props.device.deviceId,
                    imageFormat: "image/"+this.props.imageFormat
                    } 
                }}>
                <Webcam audio={false} videoConstraints={{ deviceId: this.props.device.deviceId }} />
                <p>{this.props.device.label}</p>
            </Link>
        )
    }

    _selectDevice = () => {
        window.confirm(this.props.device.label)
    }
}