import React from 'react';

import './App.scss';

import Topbar from './components/Topbar';
import Filters from './components/Filters';
import Contacts from './components/Contacts';
import Contact from './components/Contact';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      contacts: [],
      searchFilter: '',
      sortBy: 'id',
    };
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleFilterButtonChange = this.handleFilterButtonChange.bind(this);
  }

  componentDidMount() {
    fetch('https://5e82ac6c78337f00160ae496.mockapi.io/api/v1/contacts')
      .then((response) => response.json())
      .then((data) => this.setState({ contacts: data }));
  }

  handleFilterTextChange(filterText) {
    this.setState({
      searchFilter: filterText,
    });
  }

  handleFilterButtonChange(name) {
    this.setState({
      sortBy: name,
    });
  }

  render() {
    const filterText = this.state.searchFilter.toLowerCase();
    const sortBy = this.state.sortBy;
    const rows = this.state.contacts
      .filter(
        (contact) => contact.name.toLowerCase().indexOf(filterText) !== -1
      )
      .sort((a, b) =>
        a[sortBy] > b[sortBy] ? 1 : a[sortBy] < b[sortBy] ? -1 : 0
      );
    return (
      <div className="app" data-testid="app">
        <Topbar />
        <Filters
          filterText={this.setState.searchFilter}
          onFilterTextChange={this.handleFilterTextChange}
          onFilterButtonChange={this.handleFilterButtonChange}
          sortBy={this.state.sortBy}
        />

        <Contacts>
          {rows.map((row) => (
            <Contact data={row} />
          ))}
        </Contacts>
      </div>
    );
  }
}

export default App;
