import React, { Component } from 'react';
import CompanyComponent from './CompanyComponent';
import GuestComponent from './GuestComponent';
import moment from 'moment-timezone';
const messages = require('../data/Messages.json');


class MessageComponent extends Component {
  constructor() {
    super();
    this.state = {
      message : '',
      selectedCompany : {},
      selectedGuest : {},
      selectedMessage : '',
      constructedMessage : '',
      showSendMessage : false,
      selectedRequiredFields : true
    };
  }

  setSelectedCompany = selectedCompany => {
    this.setState({
      selectedCompany: selectedCompany
    });

  }

  setSelectedGuest = selectedGuest => {
    this.setState({
      selectedGuest: selectedGuest
    });

  }

  setSelectedMessage = event => {
    this.setState({
      selectedMessage: event.target.value,
      constructedMessage: '',
    });

  }

  setConstructedMessage = event => {
    this.setState({
      selectedMessage: '',
      constructedMessage: event.target.value
    });
  }

  sendMessage = () => {
    this.setState({showSendMessage: true})
  }

  constructMessageTemplate = (selectedMessageTemplate, selectedMessageVars) => {
    if(selectedMessageTemplate.includes('{')) {
      for(const prop in selectedMessageVars) {
        selectedMessageTemplate = selectedMessageTemplate.replace(new RegExp('{'+ prop +'}','gi'), selectedMessageVars[prop]);
      }
    }
    this.setState({
      message: selectedMessageTemplate
    });

  }

  getTimeOfDay = () => {
        let timeZone = '', timeOfDay = '';

        switch(this.state.selectedCompany.timeZone) {
          case 'US/Western':
            timeZone = 'America/Los_Angeles';
            break;
          case 'US/Central':
            timeZone = 'America/Chicago';
            break;
          case 'US/Eastern':
            timeZone = 'America/New_York';
            break;
            // skip default case
        }
        const localTime = moment.tz(timeZone).format('HH');

        if(localTime <= 11){
          timeOfDay = 'Morning';
        } else if(localTime >= 12 && localTime <= 17){
          timeOfDay = 'Afternoon';
        } else {
          timeOfDay = 'Evening';
        }

        return timeOfDay;

  }

  handleMessage = () => {
    let selectedMessageVars = {};
    if(Object.keys(this.state.selectedGuest).length && Object.keys(this.state.selectedCompany).length) {
      selectedMessageVars =   {"firstName": this.state.selectedGuest.firstName, "lastName": this.state.selectedGuest.lastName, "roomNumber": this.state.selectedGuest.reservation.roomNumber,
      "company": this.state.selectedCompany.company, "timeOfDay": this.getTimeOfDay(), "city": this.state.selectedCompany.city};
    }

    if(Object.keys(selectedMessageVars).length && this.state.selectedMessage) {
      this.constructMessageTemplate(this.state.selectedMessage, selectedMessageVars);
      this.setState({showSendMessage: false});
      this.setState({selectedRequiredFields: true});
    } else if(this.state.constructedMessage) {
      this.setState({selectedRequiredFields: true});
      this.constructMessageTemplate(this.state.constructedMessage, selectedMessageVars);
    } else {
      this.setState({selectedRequiredFields: false});
    }
  }




  render() {
    return (
      <div>
        <div>
          <GuestComponent setSelectedGuest={this.setSelectedGuest} />
        </div>
        <br/>
        <div>
          <CompanyComponent setSelectedCompany={this.setSelectedCompany} />
        </div>
      <br/>
        <div>
          <label>Select A Message</label><br/>
          <select name="selectMessage" id="selectMessage" ref="selectMessage"
          onChange={this.setSelectedMessage}>
          <option value="">Please Choose...</option>
          {messages.map(message =>
            <option key={message.id} value={message.message}>{message.message}</option>
          )}
          </select>
        </div>
      <br/>
        <div>
          <label>Or Construct Your Own Message</label><br/>
          <p><i>Message will not include selected guest or company.</i></p>
          <input type="text" name="constructMessage" ref="constructMessage" size="150" placeholder="Your message here...."
          value={this.state.constructedMessage}  onChange={this.setConstructedMessage}/>
        </div>
      <br />
        <div>
          {!this.state.selectedRequiredFields && <p><b>Creating a message requires selecting a guest, company and message or constructing your own message!</b></p>}
          <button name="Preview" id="previewMessage" type="button"
          onClick={this.handleMessage}>
          Preview Message
          </button>
        <br />
        {this.state.message && !this.state.showSendMessage && <div><p>Here is a preview of the message you will be sending to your guest:</p><br /><p> {this.state.message}</p></div>}
        </div>
        <div>
          {this.state.message && <button name="Send" id="sendMessage" type="button"
          onClick={this.sendMessage}>
          Send Message
          </button>}
        <br />
          {this.state.showSendMessage && <div><p>Here is the message you sent your guest:</p><br /><p> {this.state.message}</p></div>}
        </div>
      </div>
    );

  }
}

export default MessageComponent;
