import PropTypes from 'prop-types';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import addIcon from '@iconify-icons/mdi/plus';
import removeIcon from '@iconify-icons/mdi/close';

/* EJEMPLO:
  * Array de objetos (cada elemento tiene varios campos)
    {
      ....
      }
*/

const ArrayObjectSelectField = ({ options, value, onChange, displayField, valueField }) => {
  const [items, setItems] = useState(value || []);

  const handleAdd = () => {
    setItems([...items, '']);
    onChange([...items, '']);
  };

  const handleRemove = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    onChange(newItems);
  };

  const handleChange = (index, newValue) => {
    const newItems = [...items];
    newItems[index] = newValue;
    setItems(newItems);
    onChange(newItems);
  };

  return (
    <div>
      {items.map((item, index) => (
        <div key={index} className="flex gap-2 my-2 items-center">
          <select
            value={item}
            className="w-full border p-2 rounded-md"
            onChange={(e) => handleChange(index, e.target.value)}
          >
            <option value="" disabled>Seleccionar</option>
            {options.map((option, idx) => (
              <option key={idx} value={option[valueField]}>
                {option[displayField]}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => handleRemove(index)}
            className="text-red-500 ml-2"
          >
            <Icon icon={removeIcon} />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAdd}
        className="text-blue-500 mt-2 flex items-center"
      >
        Agregar <Icon icon={addIcon} className="ml-1" />
      </button>
    </div>
  );
};

ArrayObjectSelectField.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  value: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  displayField: PropTypes.string.isRequired,
  valueField: PropTypes.string.isRequired,
};

export default ArrayObjectSelectField;
