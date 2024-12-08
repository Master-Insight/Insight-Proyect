import PropTypes from 'prop-types';
import styles from '../styles';

/* EJEMPLO:
* Campo genérico (text, number, date, etc.)
  {
    name: "title",
    label: "Titulo",
    icon: BiBookmark,
    type: "text",
    default: "Aquí va un titulo",
    validation: z.string().min(5, "El titulo debe tener al menos 5 caracteres")
  },
*/

const GenericField = ({ id, type, value, onChange, placeholder = null, error }) => (
  <input
    id={id}
    type={type || 'text'}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    className={`${styles.generic} ${error?.length > 0 ? styles.error : styles.ok}`}
  />
);

GenericField.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  error: PropTypes.arrayOf(PropTypes.string),
};

export default GenericField;