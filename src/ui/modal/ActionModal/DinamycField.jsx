import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
import { Icon } from '@iconify/react';
import ArrayObjectSelectField from './fields/ArrayObjectSelect';
import ArraySelectField from './fields/ArraySelect';
import ArrayTextField from './fields/ArrayText';
import GenericField from './fields/Generic';
import TextAreaField from './fields/TextArea';
import SelectField from './fields/Select';

const sanitizeHtml = (html) => DOMPurify.sanitize(html);

// Subcomponente para renderizar los campos dinámicos del formulario.
const DynamicField = ({ field, form, parentName }) => {

  const {
    name, label, icon, // opciones label
    type, itemType, // typo de campos
    enum: enumOptions, // Select options
    displayField, valueField, // Object options (array de objetcs)
    fields: subFields, // Components options (array de fields)
  } = field;

  // Construir el nombre completo del campo con el prefijo del padre si existe
  const idF = parentName ? `${parentName}.${name}` : name;

  // Renderiza el campo según el tipo definido
  return (
    <form.Field key={idF} name={idF}>
      {({ state, handleChange }) => ( //{ //console.log({label, type, itemType, state}) return (
        <div className="my-3">
          <label htmlFor={idF} className="block mb-2 text-gray-700">
            {icon && <Icon icon={icon} className="inline-block mr-2" />}
            <span dangerouslySetInnerHTML={{ __html: sanitizeHtml(label) }} />:
          </label>

          {/* Renderizado dinámico según el tipo de campo */}

          {/* Campos básicos */} {type === "generic" && (<GenericField
            value={state.value} type={itemType}
            id={idF} onChange={handleChange} error={state.meta.errors} />)}

          {/* Textarea */} {type === "textarea" && (<TextAreaField
            value={state.value}
            id={idF} onChange={handleChange} />)}

          {/* Select */} {type === "select" && (<SelectField
            value={state.value} options={enumOptions}
            id={idF} onChange={handleChange} error={state.meta.errors} />)}

          {/* Array de textos */}{(type === 'array' && itemType === 'text') && (<ArrayTextField
            value={state.value}
            id={idF} onChange={handleChange} error={state.meta.errors} />)}

          {/* Array de select */}{(type === 'array' && itemType === 'select') && (<ArraySelectField
            value={state.value} options={enumOptions}
            onChange={handleChange} />)}

          {/* Array de select */}{(type === 'array' && itemType === 'object') && (<ArrayObjectSelectField
            value={state.value} options={enumOptions} displayField={displayField} valueField={valueField}
            onChange={handleChange} />)}

          {/* Array de fields (subcampos) */}{(type === 'array' && itemType === 'fields') && (null)}

        </div>
      )}
    </form.Field>
  );
};

DynamicField.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired, // Nombre del campo
    label: PropTypes.string.isRequired, // Etiqueta del campo
    icon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]), // Icono del campo
    default: PropTypes.any, // Valor por defecto
    type: PropTypes.oneOf(['generic', 'textarea', 'select', 'array', 'fields']).isRequired, // Tipo de campo
    itemType: PropTypes.oneOf(['text', 'select', 'object']), // Tipo de ítem para arrays
    enum: PropTypes.arrayOf(PropTypes.string), // Opciones para selects
    displayField: PropTypes.string, // Opciones para Objects array
    valueField: PropTypes.string, // Opciones para Objects array
    fields: PropTypes.array, // Subcampos (si aplica)
  }).isRequired,
  form: PropTypes.object.isRequired, // Instancia del formulario
  parentName: PropTypes.string, // Nombre del campo padre (opcional)
};

export default DynamicField;