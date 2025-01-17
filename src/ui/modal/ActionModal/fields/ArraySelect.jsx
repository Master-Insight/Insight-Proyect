import PropTypes from 'prop-types';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { amIcons as icons } from '../styles';

/* EJEMPLO:
  * Array de select
    {
      ....
      }
*/

const ArraySelectField = ({ options, value, onChange }) => {
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
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => handleRemove(index)}
            className="text-red-500 ml-2"
          >
            <Icon icon={icons.x} />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAdd}
        className="text-blue-500 mt-2 flex items-center"
      >
        Agregar <Icon icon={icons.addEle} className="ml-1" />
      </button>
    </div>
  );
};

ArraySelectField.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
};

export default ArraySelectField;
