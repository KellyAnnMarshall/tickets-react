import React, { Component } from 'react'
import Ticket from './ticket'
import Search from './search'
import './App.css'
const ticketData = require('./data/tickets.json')

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tickets: ticketData.tickets.map((ticket, id) => ({ id, ticket })),
      queryText: ''
    }
    this.searchTickets = this.searchTickets.bind(this)
    this.resetTickets = this.resetTickets.bind(this)
  }

  searchTickets(query) {
    this.setState({
      queryText: query
    })
  }

  resetTickets() {
    this.setState({
      queryText: ''
    })
  }

  eachTicket(ticket) {
    return (
      <Ticket key={ticket.id}
        index={ticket.id}>
        {ticket.ticket}
      </Ticket>
    )
  }
  render() {
    var filteredTickets = []
    var queryText = this.state.queryText.toLowerCase()

    this.state.tickets.forEach(function (item) {
      if (
        (item.ticket.artist.toLowerCase().indexOf(queryText) !== -1) ||
        (item.ticket.venue.toLowerCase().indexOf(queryText) !== -1) ||
        (item.ticket.city.toLowerCase().indexOf(queryText) !== -1) ||
        (item.ticket.date.toLowerCase().indexOf(queryText) !== -1)
      ) {
        filteredTickets.push(item)
      }
    })

    return (
      <div className="board">
        <Search
          onSearch={this.searchTickets}
          onClear={this.resetTickets}
        />
        {filteredTickets.map(this.eachTicket)}
      </div>
    )
  }
}

export default App;
