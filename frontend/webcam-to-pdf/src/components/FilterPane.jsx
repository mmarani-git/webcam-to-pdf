import React, { Component } from 'react'
import ImageService from '../services/ImageService.js'
import { WCEvents } from '../misc/WCEvents.js'
import PubSub from 'pubsub-js'

const FILTER_PREVIEW_H = 200

export default class FilterPane extends Component {
    constructor(props) {
        super(props)
        this.state = {
            image: "",

            brightness: 1.0,
            contrast: 1.0,
            saturation: 1.0
        }
    }

    getFilters = () => {
        let filters = "brightness(" + this.state.brightness + ") " +
            "contrast(" + this.state.contrast + ") "
            
        if (this.state.saturation == 0.0) {
            filters = filters + "grayscale(100%)"
        } else {
            filters = filters + "saturate("+this.state.saturation+") " 
        }

        return filters
    }

    render() {
        let imgStyles = {
            margin: 'auto',
            position: 'relative',
            top: 54
        }
        
        let controllerContainerStyles = {
            position: "relative",
            top: 50,
        }

        /* TODO we must extract the filtered
        https://stackoverflow.com/questions/30408939/how-to-save-image-from-canvas-with-css-filters
        */
        imgStyles.filter = this.getFilters()

        return (
            <div className="row">
                <div className="width40" style={controllerContainerStyles}>
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
                    <button className="btn btn-primary width70 margin10" onClick={this.resetSliders}>Reset</button>
                </div>
                <div className="width60">
                    {this.state.image && (<img
                        onLoad={this.imageLoaded}
                        style={imgStyles} 
                        src={this.state.image} 
                        width={ImageService.getWidthFromNewHeight(this.state.image,FILTER_PREVIEW_H)}
                        height={FILTER_PREVIEW_H} />)}
                </div>
            </div>
        )
    }

    imageLoaded = () => {
        let canvas = document.createElement('canvas')
        let ctx = canvas.getContext("2d")

        let img = new Image();
        let filters = this.getFilters()

        img.onload=function() {
            canvas.width=img.width
            canvas.height=img.height
            ctx.filter = filters
            ctx.drawImage(img,0,0)
            PubSub.publish(WCEvents.SCREENSHOOT_FILTERED, {image: canvas.toDataURL(ImageService.getMimeType(img.src))})
        }
        img.src = this.state.image
    }

    resetSliders = () => {
        this.setState({brightness: 1.0, contrast : 1.0, saturation : 1.0 })
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
