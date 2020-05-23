import React, { Component } from 'react'
import ImageService from '../services/ImageService.js'

const PREVIEW_HEIGHT=120;

export default class ScreenshootPreview extends Component {
    constructor(props) {
        super(props)
        this.state = {
            src: this.props.src,
            index: this.props.index
        }
    }

    render() {
        return (
            <div>
                <img width={ImageService.getWidthFromNewHeight(this.state.src,PREVIEW_HEIGHT)} height={PREVIEW_HEIGHT} src={this.state.src} />
                <div>{this.state.index}</div>
            </div>
        )
    }
}
