import css from './Filter.module.css';

export const Filter = ({ value, onChange }) => (
  <div className={css.filterDiv}>
    <label className={css.filterDiv__label}>
      Find contacts by name
      <input
        className={css.filterDiv__input}
        type="name"
        value={value}
        onChange={onChange}
      />
    </label>
  </div>
);
