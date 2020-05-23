import React, { Component } from 'react'
import './ScreenshootBar.css'
import ScreenshootPreview from './ScreenshootPreview'

export default class ScreenshootBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            screenshoots: []
        }
    }

    render() {
        return (<div><div className="autoFlex">
            {this.state.screenshoots.map(screenshoot => <ScreenshootPreview src={screenshoot} />)}
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