import React, { Component } from 'react'
import Ticket from './ticket'
import Search from './search'
import './App.css'
const ticketData = require('./data/tickets.json')

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tickets: [],
      queryText: ''
    }
    this.eachTicket = this.eachTicket.bind(this)
    this.add = this.add.bind(this)
    this.searchTickets = this.searchTickets.bind(this)
    this.resetTickets = this.resetTickets.bind(this)
    this.nextId = this.nextId.bind(this)
  }

  add(ticket) {
    this.setState(prevState => ({
      tickets: [
        ...prevState.tickets,
        {
          id: this.nextId(),
          ticket: ticket
        }
      ]
    }))
  }

  componentWillMount() {
    var self = this
    ticketData.tickets.forEach(ticket => self.add(ticket))
  }

  nextId() {
    this.uniqueId = this.uniqueId || 0
    return this.uniqueId++
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

  eachTicket(ticket, i) {
    return (
      <Ticket key={ticket.id}
        index={ticket.id}>
        {ticket.ticket}
      </Ticket>
    )
  }
  render() {
    var filteredTickets = []
    var queryText = this.state.queryText

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
