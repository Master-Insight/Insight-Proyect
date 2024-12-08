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

/**
 * Subcomponente para renderizar los campos dinámicos del formulario.
*/
const DynamicField = ({ field, form, parentName }) => {

  const { name, label, icon, type, enum: enumOptions, itemType, fields: subFields, noEditable } = field;

  if (noEditable) { return }

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
          {/* Textarea */} {type === "textarea" && (<TextAreaField
            id={idF} value={state.value} onChange={handleChange} />)}

          {/* Select */} {type === "select" && (<SelectField
            id={idF} value={state.value || ""} onChange={handleChange} error={state.meta.errors} options={enumOptions} />)}

          {/* Array de textos */}{(type === 'array' && itemType === 'text') && (<ArrayTextField
            id={idF} value={state.value} onChange={handleChange} error={state.meta.errors} />)}

          {/* Array de select */}{(type === 'array' && itemType === 'select') && (<ArraySelectField
            value={state.value} onChange={handleChange} options={enumOptions} />)}

          {/* Array de select */}{(type === 'array' && itemType === 'object') && (<ArrayObjectSelectField
            value={state.value} onChange={handleChange} options={enumOptions} displayField={"full_name"} valueField={"_id"} />)}

          {/* Array de fields (subcampos) */}{(type === 'array' && itemType === 'fields') && (null)}

          {/* Campos básicos */} {type === "generic" && (<GenericField
            id={idF} type={itemType} value={state.value} onChange={handleChange} error={state.meta.errors} />)}
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
    type: PropTypes.oneOf(['generic', 'textarea', 'select', 'array', 'fields']).isRequired, // Tipo de campo
    enum: PropTypes.arrayOf(PropTypes.string), // Opciones para selects
    itemType: PropTypes.oneOf(['text', 'select', 'object']), // Tipo de ítem para arrays
    fields: PropTypes.array, // Subcampos (si aplica)
    default: PropTypes.any, // Valor por defecto
    noEditable: PropTypes.bool, // Indica si el campo no es editable
  }).isRequired,
  form: PropTypes.object.isRequired, // Instancia del formulario
  parentName: PropTypes.string, // Nombre del campo padre (opcional)
};


export default DynamicField;