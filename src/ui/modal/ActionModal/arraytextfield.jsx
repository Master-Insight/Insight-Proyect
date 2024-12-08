import PropTypes from 'prop-types';
import styles from './styles';

/* EJEMPLO:
  * Campo Array (lista de valores)
  {
    name: "professions",
    label: "Profesiones",
    icon: BiBriefcase,
    type: "array",  // Indica que es un array
    itemType: "text",  // El tipo de cada ítem dentro del array (puede ser "text", "select", etc.)
    default: ["Backend"],
    validation: z.array(z.string()).min(1, "Debe haber al menos una profesión")
  },
*/

const ArrayTextField = ({ id, value = [], onChange, error, placeholder }) => {
  const handleAdd = () => {
    onChange([...value, ""]);
  };

  const handleRemove = (index) => {
    const newValue = value.filter((_, i) => i !== index);
    onChange(newValue);
  };

  const handleChange = (index, newValue) => {
    const updatedValue = value.map((item, i) => (i === index ? newValue : item));
    onChange(updatedValue);
  };

  return (
    <div>
      <label htmlFor={id}>{id}</label>
      {value.map((item, index) => (
        <div key={index} className={styles.arrayItem}>
          <input
            type="text"
            value={item}
            placeholder={placeholder || "Agregar texto"}
            onChange={(e) => handleChange(index, e.target.value)}
            className={`${styles.generic} ${error?.length > 0 ? styles.error : styles.ok}`}
          />
          <button type="button" onClick={() => handleRemove(index)}>
            Eliminar
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAdd}>
        Agregar
      </button>
    </div>
  );
};

ArrayTextField.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  error: PropTypes.arrayOf(PropTypes.string),
  placeholder: PropTypes.string,
};

export default ArrayTextField;
