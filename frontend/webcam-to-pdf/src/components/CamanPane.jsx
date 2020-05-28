import React, { Component } from 'react'

const CANVAS_HEIGHT = 200

export default class CamanPane extends Component {
    constructor(props) {
        super(props)
        this.state = {
            image: "",
            grayscale: false,
            contrast: 0,
            brightness: 0,
            saturation: 0,
            hue: 0
        }

        this._canvas = React.createRef();
    }

    handleValueChanged = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const canvasStyles = {
            margin: 'auto',
            position: 'relative',
            top: 50,
            border: '1px',
            borderColor: 'black'
        }

        let canvas = this._canvas.current

        if (canvas !== null) {
            this.updateCanvas(canvas);
        }

        return (
            <div className="row">
                <div className="width40">
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
                </div>
                <div className="width60">
                    <canvas id="camanCanvas" ref={this._canvas} id="canvas" style={canvasStyles}></canvas>
                </div>
            </div>
        )
    }

    addScreenshoot(image) {
        this.setState({ image: image })
    }

    updateCanvas = (canvas) => {
        let ctx = canvas.getContext('2d');

        /*
        UNDEFINED: WHY ??????????????????????????????????????????
        THIS IS SYNC
        let w = ImageService.getWidthFromNewHeight(this.state.image, CANVAS_HEIGHT)
        */
        let w = CANVAS_HEIGHT / 3 * 4
        canvas.width = w
        canvas.height = CANVAS_HEIGHT

        let image = new Image()
        image.onload = function () {
            ctx.drawImage(image, 0, 0, w, CANVAS_HEIGHT)
            
        }
        image.src = this.state.image
    }
}
