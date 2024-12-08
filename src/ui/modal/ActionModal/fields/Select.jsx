import PropTypes from 'prop-types';
import styles from '../styles';

/* EJEMPLO:
  * Campo Select (opciones limitadas)
  {
    name: "languages",
    label: "Lenguajes",
    icon: BiCode,
    type: "select",  // Select estático
    itemType: "text",
    enum: ["JavaScript", "Python", "TypeScript", "Go", "Ruby"],  // Opciones del select
    default: "JavaScript",
    validation: z.enum(["JavaScript", "Python", "TypeScript", "Go", "Ruby"])
  },
*/

const SelectField = ({ id, value, onChange, error, options }) => (
  <select
    id={id}
    value={value || ""}
    onChange={(e) => onChange(e.target.value)}
    className={`${styles.generic} ${error?.length > 0 ? styles.error : styles.ok}`}
  >
    {options.map((option, index) => (
      <option key={index} value={option}>
        {option}
      </option>
    )
    )}
  </select>
);


SelectField.propTypes = {
  id: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  error: PropTypes.arrayOf(PropTypes.string),
  options: PropTypes.arrayOf(PropTypes.string),
};

export default SelectField;