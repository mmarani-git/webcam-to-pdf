import React, { Component } from 'react'

export default class CamanPreview extends Component {
    render() {
        return (
            <div className="row">
                <div className="width50"><Controls /></div>
                <div className="width50"><Preview /></div>
            </div>
        )
    }
}

class Controls extends Component {
    constructor(props) {
        super(props)
        this.state = {
            grayscale: false,
            contrast: 0,
            brightness: 0,
            saturation: 0,
            hue: 0
        }
    }
    render() {
        return (<>
            <div className="row">
                <div className="text-right">
                    Grayscale:
            </div>
                <input className="margin10"
                    type="checkbox"
                    id="grayscale"
                    name="grayscale"
                    value={this.state.grayscale}
                    onChange={this.handleValueChanged} />
            </div>
            <div className="row">
                <div className="width50 text-right">
                    Contrast:
                </div>
                <input className="margin10"
                    type="range" min="-100"
                    step="1"
                    max="100"
                    vaule={this.state.contrast}
                    onChange={this.handleValueChanged} />
            </div>
            <div className="row">
                <div className="width50 text-right">
                    Brightness:
                </div>
                <input className="margin10"
                    type="range" min="-100"
                    step="1"
                    max="100"
                    vaule={this.state.brightness}
                    onChange={this.handleValueChanged} />
            </div>
            <div className="row">
                <div className="width50 text-right">
                    Saturation:
                </div>
                <input className="margin10"
                    type="range" min="-100"
                    step="1"
                    max="100"
                    vaule={this.state.saturation}
                    onChange={this.handleValueChanged} />
            </div>
            <div className="row">
                <div className="width50 text-right">
                    Hue:
                </div>
                <input className="margin10"
                    type="range" min="-100"
                    step="1"
                    max="100"
                    vaule={this.state.hue}
                    onChange={this.handleValueChanged} />
            </div>
        </>)
    }
}

class Preview extends Component {
    render() {
        return ("Preview")
    }
}