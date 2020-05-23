import React, { Component } from 'react'
import ImageService from '../services/ImageService.js'
import './ScreenshootPreview.css'

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
                <div class="outer">
                    <div class="inline inner">{this.state.index}</div>
                    <div class="inline inner"><a href="#" class="btn btn-danger width100"><i class="fa fa-trash"/></a></div>
                </div>
            </div>
        )
    }
}
