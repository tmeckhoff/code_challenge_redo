import React, { Component } from 'react';
var messages = require('./Messages.json');
var companies = require('./Companies.json');
var guests = require('./Guests.json');


class MessageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message : '',
            companyId : 0,
            guestId : 0,
            selectedMessage : '',
            constructedMessage : '',
            showSendMessage : false
        };
    }

   logCompany(val) {
    this.setState({
      companyId: val.target.value
    });

}

   logGuest(val) {
    this.setState({
        guestId: val.target.value
    });
}

  logMessage(val) {
    this.setState({
        selectedMessage: val.target.value,
        constructedMessage: '',
    }); 

}

logConstructMessage(val){
      this.setState({
        selectedMessage: '',
        constructedMessage: val.target.value
    });
    }

    sendMessage(val){
       this.setState({showSendMessage: true})
    }

template(string, obj){
  var s = string;
  for(var prop in obj) {
    s = s.replace(new RegExp('{'+ prop +'}','gi'), obj[prop]);
  }
  console.log(s);
  this.setState({
      message: s
    });

}

handleMessage(val){
  this.setState({showSendMessage: false});

  var firstName = '', lastName = '', roomNumber = 0, timeOfDay = '', company = '', city = '', timeZone = '';

  for(var i = 0; i < companies.length; i++){
    if(this.state.companyId == companies[i].id){
      company = companies[i].company;
      city = companies[i].city;
      timeZone = companies[i].timezone;
    
    }
  }
    for(i = 0; i < guests.length; i++){
    if(this.state.guestId == guests[i].id){
      firstName = guests[i].firstName;
      lastName = guests[i].lastName;
      roomNumber = guests[i].reservation.roomNumber;

    }
  }

  if(timeZone.includes("US/Western")){
   timeZone = "America/Los_Angeles";
  } else if(timeZone.includes("US/Central")){
   timeZone = "America/Chicago";
  } else if(timeZone.includes("US/Eastern")){
    timeZone = "America/New_York";
  }

  var localTime = new Date();
  localTime.toLocaleDateString("en-US", {"timeZone": timeZone});
  var hours = localTime.getHours();
 
 if(hours <= 11){
  timeOfDay = 'Morning';
 } else if(hours >= 12 && hours <= 17){
  timeOfDay = 'Afternoon';
 } else {
  timeOfDay = 'Evening';
 }

  var messageVars = {"firstName": firstName, "lastName": lastName, "roomNumber": roomNumber, "company": company, "timeOfDay": timeOfDay, "city": city};

    if(this.state.selectedMessage){
       this.template(this.state.selectedMessage, messageVars);
     } else {
       this.template(this.state.constructedMessage, messageVars);
     }
   
}




    render() {
        return (
            <div>
 <div>
                    <label>Select A Guest</label><br/>
                    <select name="selectGuests" id="selectGuests" ref="selectGuests"
                            onChange={this.logGuest.bind(this)}>
                            <option value="">Please Choose...</option>
                      {guests.map(guest =>
      <option key={guest.id} value={guest.id}>{guest.firstName} {guest.lastName}</option>
    )}
                    </select>
                    </div><br/>
                                     <div>
                    <label>Select A Company</label><br/>
                    <select name="selectCompany" id="selectCompany" ref="selectCompany"
                            onChange={this.logCompany.bind(this)}>
                            <option value="">Please Choose...</option>
                      {companies.map(company =>
      <option key={company.id} value={company.id}>{company.company}</option>
    )}
                    </select>
                </div><br/>
                                   <div>
                    <label>Select A Message</label><br/>
                    <select name="selectMessage" id="selectMessage" ref="selectMessage"
                            onChange={this.logMessage.bind(this)}>
                            <option value="">Please Choose...</option>
                      {messages.map(message =>
      <option key={message.id} value={message.message}>{message.message}</option>
    )}
                    </select>
                </div><br/>
                 <div>
                        <label>Or Construct Your Own Message</label><br/>
                        <input type="text" name="constructMessage" ref="constructMessage" size="150" placeholder="Ex. Hello {firstName}, welcome to {company}! Placeholders, such as firstName, must be wrapped in {} and must be one word but NOT case sensitive"
                               value={this.state.constructedMessage}  onChange={this.logConstructMessage.bind(this)}/>
                    </div>
<br />
<div>
<button name="Construct" id="constructMessage" type="button"
                            onClick={this.handleMessage.bind(this)}>
                        Construct Message
                    </button><br />
                    <div><p>Here is the message you will be sending to your guest:</p><br /><p> {this.state.message}</p></div>
                    </div>
                    <div>
                    <button name="Construct" id="constructMessage" type="button"
                            onClick={this.sendMessage.bind(this)}>
                        Send Message
                    </button><br />
                    {this.state.showSendMessage && <div><p>Here is the message you sent your guest:</p><br /><p> {this.state.message}</p></div>}
                    </div>
</div>
);

    }
}

export default MessageComponent;