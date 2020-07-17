import React, { Component } from 'react'

class Ticket extends Component {

    render() {
        return (
            <div className="ticket">
                <dl>
                    <dt>Artist</dt>
                    <dd>{this.props.children.artist}</dd>
                    <dt>Venue</dt>
                    <dd>{this.props.children.venue}</dd>
                    <dt>City</dt>
                    <dd>{this.props.children.city}</dd>
                    <dt>Date</dt>
                    <dd>{this.props.children.date}</dd>
                </dl>
                <div className={this.props.children.size}>
                    <img src={require('./images/' + this.props.children.image)} alt="{this.props.children.artist}" />
                </div>
            </div>
        )
    }
}

export default Ticket