import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import css from './ContactForm.module.css';

const INITIAL_STATE = {
  name: '',
  number: '',
};

export class ContactForm extends Component {
  state = { ...INITIAL_STATE };

  generateUuid = uuidv4();

  handleChange = name => e => {
    const { target } = e;
    this.setState(() => ({ [name]: target.value }));
  };

  handleSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    onSubmit(this.state);
    this.reset();
  };

  reset = () => {
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    return (
      <form className={css.contactForm} onSubmit={this.handleSubmit}>
        <label htmlFor={this.generateUuid}>Name</label>
        <input
          className={css.contactForm__input}
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.handleChange('name')}
          pattern="^[a-zA-Zа-яА-Я]+([ -'][a-zA-Zа-яА-Я]+)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          id={this.generateUuid}
          required
        />
        <label htmlFor={this.generateUuid}>Number </label>
        <input
          className={css.contactForm__input}
          type="tel"
          name="number"
          value={this.state.number}
          onChange={this.handleChange('number')}
          pattern="^[+]?[0-9 \u0028\u0029\u002D]*$"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          id={this.generateUuid}
          required
        />

        <button type="submit">Add contact</button>
      </form>
    );
  }
}
