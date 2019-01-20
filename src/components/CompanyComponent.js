import React, { Component } from 'react';
const companies = require('../data/Companies.json');

class CompanyComponent extends Component {

  handleSelectCompany = event => {
    const selectedCompany = companies.find(company => {
      return company.id == event.target.value;
    });
    this.props.setSelectedCompany(selectedCompany);

  }


  render() {
    return (
        <div>
          <div>
            <label>Select A Company</label><br/>
              <select name="selectCompany" id="selectCompany" ref="selectCompany"
              onChange={this.handleSelectCompany}>
              <option value="">Please Choose...</option>
              {companies.map(company =>
                <option key={company.id} value={company.id}>{company.company}</option>
              )}
              </select>
         </div>
         <br/>
        </div>
    );

  }
}

export default CompanyComponent;
