import React, { Component } from 'react'
import ImageService from '../services/ImageService.js'
import './ScreenshootPreview.css'
import PubSub from 'pubsub-js'
import { WCEvents } from '../misc/WCEvents.js'

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
                <img alt="" 
                    width={ImageService.getWidthFromNewHeight(this.state.src,PREVIEW_HEIGHT)} 
                    height={PREVIEW_HEIGHT} 
                    src={this.state.src} />
                <div className="outer">
                    <div className="inline inner">{this.state.index}</div>
                    <div className="inline inner"><button onClick={this.publishDelete} className="btn btn-danger width100"><i className="fa fa-trash"/></button></div>
                </div>
            </div>
        )
    }

    publishDelete = () => {
        PubSub.publish(WCEvents.SCREENSHOOT_DELETED, {index: this.state.index})
    }
}
