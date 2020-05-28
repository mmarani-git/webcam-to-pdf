import React, { Component } from 'react'
import ImageService from '../services/ImageService.js'

export default class FilterPane extends Component {
    constructor(props) {
        super(props)
        this.state = {
            image: "",

            grayscale: false,
            brightness: 1.0,
            contrast: 1.0,
            saturation: 1.0,
            hue: 0
        }
    }

    render() {
        let imgStyles = {
            margin: 'auto',
            position: 'relative',
            top: 50,
            border: '1px',
            borderColor: 'black',
            width: 200,
            height: 150
        }

        return (
            <div className="row">
                <div className="width40">
                    <div className="row">
                        <div className="text-right">Grayscale:</div>
                        <input className="margin10"
                            type="checkbox"
                            id="grayscale"
                            name="grayscale"
                            value={this.state.grayscale}
                            onChange={this.handleValueChanged} />
                    </div>
                    <div className="row">
                        <div className="width50 text-right">Contrast:</div>
                        <input className="margin10"
                            type="range" min="0.0"
                            step="0.01"
                            max="2.0"
                            name="contrast"
                            value={this.state.contrast}
                            onChange={this.handleValueChanged} />
                    </div>
                    <div className="row">
                        <div className="width50 text-right">Brightness:</div>
                        <input className="margin10"
                            type="range" min="0.0"
                            step="0.01"
                            max="2.0"
                            name="brightness"
                            value={this.state.brightness}
                            onChange={this.handleValueChanged} />
                    </div>
                    <div className="row">
                        <div className="width50 text-right">Saturation:</div>
                        <input className="margin10"
                            type="range" min="0.0"
                            step="0.01"
                            max="2.0"
                            name="saturation"
                            value={this.state.saturation}
                            onChange={this.handleValueChanged} />
                    </div>
                    <div className="row">
                        <div className="width50 text-right">Hue:</div>
                        <input className="margin10"
                            type="range" min="0"
                            step="1"
                            max="360"
                            name="hue"
                            value={this.state.hue}
                            onChange={this.handleValueChanged} />
                    </div>
                </div>
                <div className="width60">
                    { this.state.image && (<img style={imgStyles} src={this.state.image} />)}
                </div>
            </div>
        )
    }

    handleValueChanged = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    addScreenshoot(image) {
        this.setState({ image: image })
    }
}
