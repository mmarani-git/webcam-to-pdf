import React, { Component } from 'react'
import { WCEvents } from '../misc/WCEvents.js'
import PubSub from 'pubsub-js'
import './SaveDialog.css'
import { SaveDialogEvents } from '../misc/SaveDialogEvents.js'

export default class SaveDialog extends Component {
    constructor(props) {
        super(props)

        this.K_FILENAME = 'fileName'

        this.state = {
            [this.K_FILENAME]: ""
        }
    }

    reset() {
        this.setState({[this.K_FILENAME] : ""})
    }

    keyPressed(event) {
        if (event.keyCode === 13) {
            PubSub.publish(SaveDialogEvents.ENTER_PRESSED)
        } else if (event.keyCode === 27) {
            PubSub.publish(SaveDialogEvents.ESC_PRESSED)
        }
    }

    componentDidMount() {
        this._enterPressedSubscriptionToken =  PubSub.subscribe(SaveDialogEvents.ENTER_PRESSED,this._subscribeEnterPressed.bind(this))
        this._escPressedSubscriptionToken = PubSub.subscribe(SaveDialogEvents.ESC_PRESSED,this._subscribeEscPressed.bind(this))
        this._subscribeEnterPressed("","")
        this._subscribeEscPressed("","")
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this._enterPressedSubscriptionToken)
        PubSub.unsubscribe(this._escPressedSubscriptionToken)
    }

    _subscribeEnterPressed(msg,data) {
        if (msg === "") {
            return
        }

        this._save()
    }

    _subscribeEscPressed(msg,data) {
        if (msg === "") {
            return
        }
        this._cancel()
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
                        <input className="inputBox maxZIndex"
                            ref={input => input && input.focus()} 
                            type="text"
                            name={this.K_FILENAME}
                            value={this.state[this.K_FILENAME]}
                            onChange={this._handleValueChanged} />
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
        if (this.state[this.K_FILENAME].trim() === "") {
            return
        }

        this._publish()
    }

    _cancel = () => {
        this.setState({[this.K_FILENAME] : ""});
        this._publish()
    }

    _publish = () => {
        PubSub.publish(WCEvents.SAVE, {fileName : this.state[this.K_FILENAME] })
    }

    _handleValueChanged = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
}