import React, { Component } from 'react'
import ScreenshootPreview from './ScreenshootPreview'
import { WCEvents } from '../misc/WCEvents.js'
import PubSub from 'pubsub-js'
import PdfService from '../services/PdfService.js'

export default class ScreenshootBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            screenshoots: []
        }
    }

    render() {
        return (<div><div className="scrollX">
            {this.state.screenshoots.map(
                (screenshoot, index) => <ScreenshootPreview index={index} key={index} src={screenshoot} />
            )}
        </div></div>)
    }

    addScreenshoot(screenshoot) {
        let currentSnaps = this.state.screenshoots.slice();
        
        currentSnaps.push(screenshoot);
        this.setState({ screenshoots: currentSnaps });
    }

    componentDidMount() {
        PubSub.subscribe(WCEvents.SCREENSHOOT_DELETED, this.subscribeSnapshotDeleted.bind(this));
        PubSub.subscribe(WCEvents.SAVE, this.subscribeSave.bind(this));
        PubSub.subscribe(WCEvents.SCREENSHOOT_FILTERED, this.subscribeScreenshootFiltered.bind(this));

        this.subscribeSnapshotDeleted("", "")
        this.subscribeSave("", "")
        this.subscribeScreenshootFiltered("","")
    }

    subscribeScreenshootFiltered(msg,data) {
        if (msg==="") {
            return;
        }
        this.addScreenshoot(data.image)
    }

    getScreenshoots = () => {
        return this.state.screenshoots.slice()
    }

    subscribeSnapshotDeleted(msg,data) {
        if (msg==="") {
            return;
        }
        
        let currentSnaps = this.state.screenshoots.slice();
        currentSnaps.splice(data.index,1);
        /*
        Workaround, probably something is wrong with my key in the map above.
        https://github.com/facebook/react/issues/16964
        */
        const nullStatus = [];
        this.setState({screenshoots : nullStatus});
        this.setState({screenshoots : currentSnaps});
    }

    subscribeSave(msg,data) {
        if (msg==="" || data.fileName==="") {
            return;
        }

        PdfService.savePdf(this.state.screenshoots, data.fileName).then(this.reset())
    }

    reset = () => {
        this.setState({screenshoots : []})
    }
}