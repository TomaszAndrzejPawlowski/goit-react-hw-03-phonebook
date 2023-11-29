import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import css from './App.module.css';

const INITIAL_STATE = {
  contacts: [],
  filter: '',
};

export class App extends Component {
  state = {
    ...INITIAL_STATE,
  };

  addContact = ({ name, number }) => {
    const lowerCaseName = name.toLowerCase();
    let isAdded = false;
    this.state.contacts.forEach(contact => {
      if (contact.name.toLowerCase() === lowerCaseName) {
        alert(`${name} is already in your contact list.`);
        isAdded = true;
      }
      if (contact.number === number) {
        alert(`${name} cannot have the same number as your other contact.`);
        isAdded = true;
      }
    });
    if (isAdded) {
      return;
    }
    const contact = {
      id: uuidv4(),
      name: name,
      number: number,
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  componentDidMount = () => {
    const storage = localStorage.getItem('state.contacts');
    const parsedStorage = JSON.parse(storage);
    if (parsedStorage) {
      this.setState({ contacts: parsedStorage });
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem(
        'state.contacts',
        JSON.stringify(this.state.contacts)
      );
    }
  };

  handleFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getContacts = () => {
    const { contacts, filter } = this.state;
    const lowerCaseFilter = filter.toLowerCase();
    const filterContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(lowerCaseFilter)
    );
    return filterContacts;
  };

  deleteContact = delId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== delId),
    }));
  };

  render() {
    const { filter } = this.state;
    const generateContacts = this.getContacts();

    return (
      <div className={css.container}>
        <h1 className={css.titles}>Phonebook</h1>
        <ContactForm generateId={uuidv4()} onSubmit={this.addContact} />
        <h2 className={css.titles}>Contacts</h2>
        <Filter value={filter} onChange={this.handleFilter} />
        <ContactList
          contacts={generateContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
