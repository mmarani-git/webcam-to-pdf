import React, { Component } from 'react'
import './ScreenShootPreview.css'

export default class ScreenshootPreview extends Component {
    constructor(props) {
        super(props)
        this.state = {
            screenshoots: []
        }
    }

    render() {
        return (<div><div className="autoFlex">
            {this.state.screenshoots.map(screenshoot => <img width="160" height="120" src={screenshoot} />)}
        </div></div>)
    }

    addScreenshoot(screenshoot) {
        let currentSnaps = this.state.screenshoots.slice(0);
        /*
        if (currentSnaps.length > 5) {
            currentSnaps.shift();
        }
        */
        currentSnaps.push(screenshoot);
        this.setState({ screenshoots: currentSnaps });
    }
}