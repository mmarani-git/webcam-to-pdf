import React, { Component } from 'react'
import { WCEvents } from '../misc/WCEvents.js'
import PubSub from 'pubsub-js'
import './SaveDialog.css'

export default class SaveDialog extends Component {
    constructor(props) {
        super(props)

        this.K_FILENAME = 'fileName'

        this.state = {
            [this.K_FILENAME]: ""
        }
    }

    render() {
        this._showHideClassName = this.props.show ? "wcmodal display-block" : "wcmodal display-none";

        return (
            <div id="saveDialog" className={this._showHideClassName}>
                <section className="wcmodal-main">
                    <div className="padding10">
                        File name:
                    </div>
                    <div className="inputBox">
                        <input className="inputBox"
                            type="text"
                            name={this.K_FILENAME}
                            value={this.state[this.K_FILENAME]}
                            onChange={this.handleValueChanged} />
                    </div>
                    <div className="outer">
                        <div className="inline inner">
                            <button className="btn btn-light" onClick={this._cancel}>Cancel</button>
                        </div>
                        <div className="inline inner">
                            <button className="btn btn-primary" onClick={this._save}>Save</button>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    _save = () => {
        this._publish()
    }

    _cancel = () => {
        this.setState({[this.K_FILENAME] : ""});
        this._publish()
    }

    _publish = () => {
        PubSub.publish(WCEvents.SAVE, {fileName : this.state[this.K_FILENAME] })
    }

    handleValueChanged = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
}