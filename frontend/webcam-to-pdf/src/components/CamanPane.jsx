import React, { Component } from 'react'

export default class CamanPreview extends Component {
    render() {
        return (
            <div className="row">
                <div className="width50"><Controls/></div>
                <div className="width50"><Preview/></div>
            </div>
        )
    }
}

class Controls extends Component {
    render() {
        return ("Controls")
    }
}

class Preview extends Component {
    render() {
        return ("Preview")
    }
}