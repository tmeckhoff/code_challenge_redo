import React, { Component } from 'react';
const guests = require('../data/Guests.json');

class GuestComponent extends Component {

  handleSelectGuest = event => {
    const selectedGuest = guests.find(guest => {
      return guest.id == event.target.value;
    });
    this.props.setSelectedGuest(selectedGuest);

  }


  render() {
    return (
      <div>
        <div>
          <label>Select A Guest</label><br/>
            <select name="selectGuest" id="selectGuest" ref="selectGuest"
            onChange={this.handleSelectGuest}>
            <option value="">Please Choose...</option>
              {guests.map(guest =>
                <option key={guest.id} value={guest.id}>{guest.firstName} {guest.lastName}</option>
              )}
            </select>
          </div>
          <br/>
      </div>
    );

  }
}

export default GuestComponent;
