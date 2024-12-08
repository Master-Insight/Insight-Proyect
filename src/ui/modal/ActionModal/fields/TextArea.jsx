import PropTypes from 'prop-types';
import styles from '../styles';

/* EJEMPLO:
* Campo Textarea
  {
    name: "description",
    label: "Descripción",
    icon: null,
    type: "textarea",
    default: "",
    validation: z.string().min(10, "La descripción debe tener al menos 10 caracteres")
  },
*/

const TextAreaField = ({ id, value, onChange, placeholder = null, error }) => (
  <textarea
    id={id}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    className={`${styles.generic} ${error?.length > 0 ? styles.error : styles.ok}`}
  />
);

TextAreaField.propTypes = {
  id: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  error: PropTypes.arrayOf(PropTypes.string),
};

export default TextAreaField;