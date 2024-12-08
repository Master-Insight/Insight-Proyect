import PropTypes from 'prop-types';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { amIcons as icons } from '../styles';
import DynamicField from '../DynamicField';

const ArrayFieldsComponent = ({ subFields, value, onChange, idF }) => {
  const [items, setItems] = useState(value || []);

  const handleAdd = () => {
    const newItems = [...items, {}];
    setItems(newItems);
    onChange(newItems);
  };

  const handleRemove = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    onChange(newItems);
  };

  const handleSubFieldChange = (index, subFieldName, subFieldValue) => {
    const newItems = [...items];
    newItems[index] = {
      ...newItems[index],
      [subFieldName]: subFieldValue,
    };
    setItems(newItems);
    onChange(newItems);
  };

  return (
    <div>
      {items.map((item, index) => (
        <div key={index} className="my-3 border rounded-md p-2">
          <h4 className="font-semibold mb-2">Subgrupo {index + 1}</h4>
          {subFields.map((subField) => (
            <DynamicField
              key={`${index}-${subField.name}`}
              field={subField}
              value={item[subField.name] || ''}
              onChange={(subValue) => handleSubFieldChange(index, subField.name, subValue)}
              parentName={`${idF}[${index}]`}
            />
          ))}
          <button
            type="button"
            onClick={() => handleRemove(index)}
            className="text-red-500 mt-2 flex items-center"
          >
            <Icon icon={icons.x} className="mr-1" /> Eliminar Subgrupo
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAdd}
        className="text-blue-500 mt-2 flex items-center"
      >
        Agregar Subgrupo <Icon icon={icons.addEle} className="ml-1" />
      </button>
    </div>
  );
};

ArrayFieldsComponent.propTypes = {
  subFields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      label: PropTypes.string,
      validation: PropTypes.any,
    })
  ).isRequired,
  value: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func.isRequired,
  idF: PropTypes.string.isRequired,
};

export default ArrayFieldsComponent;
