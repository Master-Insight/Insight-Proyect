import React, { useState } from 'react'
import { useForm } from '@tanstack/react-form';
import Modal from './Modal';
import { icons, styles, variant } from '../../../config/layout';
import { Icon } from '@iconify/react';
import { z } from 'zod';
import { zodValidator } from '@tanstack/zod-form-adapter';
import PropTypes from 'prop-types';
import GenericField from './ActionModal/genericfield';
import TextAreaField from './ActionModal/textarefield';
import DOMPurify from 'dompurify';
import SelectField from './ActionModal/selectField';
import ArrayTextField from './ActionModal/arraytextfield';
import ArraySelectField from './ActionModal/arrayselectfield';
import ArrayObjectSelectField from './ActionModal/arrayobjectselectfield';

/**
 * CreateModal Componente Boton que abre un modal con opciones para rellenar (titulo, descripcion, etc) y que al "guardar" ejecuta una función
 * @param {string} title - Título del modal
 * @param {function} functionApi - Función API que se ejecuta en el submit
 * @param {array} fields - Arreglo de campos dinámicos a renderizar en el formulario
 */

/* GUIA DE FIELDS
* valores por defecto
type: "text",
default: ""
icon: opcional (se puede omitir si no se requiere validación)
validation: opcional (se puede omitir si no se requiere validación)

const fields = [
  * Campo genérico (text, number, date, etc.)  -> GenericField
  * Campo Textarea -> TextAreaField
  * Campo Select (opciones limitadas) -> SelectField
  * Campo Array (lista de valores) -> ArrayTextField
  * Campo Array (lista de enum) -> ArraySelectField
  * Campo Array (lista de objetos) -> ArrayObjectSelectField
  * Array de objetos (cada elemento tiene varios campos) -> ...
*/

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

          {/* Array de fields (subcampos) */}{(type === 'array' && itemType === 'fields') && (
            <div>
              {state.value.map((item, index) => (
                <div key={index} className="my-3 border rounded-md p-2">
                  <h4 className="font-semibold mb-2">Subgrupo {index + 1}</h4>
                  {subFields.map((subField) => (
                    <DynamicField
                      key={`${index}-${subField.name}`}
                      field={subField}
                      form={form}
                      parentName={`${idF}[${index}]`}
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const newValue = state.value.filter((_, i) => i !== index);
                      handleChange(newValue);
                    }}
                    className="text-red-500 mt-2 flex items-center"
                  >
                    <Icon icon={icons.x} /> Eliminar Subgrupo
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleChange([...state.value, {}])}
                className="text-blue-500 mt-2"
              >
                Agregar Subgrupo  <Icon icon={icons.addEle} className='inline-block' />
              </button>
            </div>
          )}

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
    icon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]), // Icono del campo (puede ser un objeto o una string)
    type: PropTypes.oneOf(['text', 'textarea', 'select', 'array', 'fields']).isRequired, // Tipo de campo
    enum: PropTypes.arrayOf(PropTypes.string), // Opciones para selects
    itemType: PropTypes.oneOf(['text', 'select']), // Tipo de ítem dentro de arrays
    fields: PropTypes.array, // Subcampos para arrays de tipo "fields"
    default: PropTypes.any, // Valor por defecto del campo
    validation: PropTypes.any, // Validación (usualmente esquema zod)
    noEditable: PropTypes.bool, // Indica si el campo no es editable
  }).isRequired, // Configuración del campo
  form: PropTypes.object.isRequired, // Instancia del formulario (Tanstack Form)
  parentName: PropTypes.string, // Nombre completo del campo (incluye prefijo del padre)
};

const ActionModal = ({ title, fields, functionApi, defaultValues, cssbutton = "primary" }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Esquema de validación generado dinámicamente
  const dynamicSchema = z.object(
    fields.reduce((acc, field) => {
      if (field.validation) {
        acc[field.name] = field.validation;
      }
      return acc;
    }, {})
  );

  // Valores por defecto generados dinámicamente
  const configDefaultValues = fields.reduce((acc, field) => {
    if (field.default) {
      acc[field.name] = field.default;
    }
    return acc;
  }, {})

  // Configuración de Tanstack Form
  const form = useForm({
    defaultValues: defaultValues || configDefaultValues,
    validatorAdapter: zodValidator(dynamicSchema),
    onSubmit: ({ value }) => {
      console.log(value);

      // functionApi && functionApi(value); // Llama a la API
      // handleCloseModal();
    }
  })

  // Controlar apertura/cierre del modal
  const handleEditClick = () => setIsModalOpen(true);
  const handleCloseModal = () => { setIsModalOpen(false); form.reset(); };

  return (
    <>
      {/* Botón para abrir el modal */}
      <button onClick={handleEditClick}
        className={`${variant[cssbutton]} ${styles.button}`}>
        {title}
        <Icon icon={icons.plus} className="inline-block ml-2" />
      </button>

      {/* Modal con formulario dinámico */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={title}>
        <form onSubmit={(e) => { e.preventDefault(); form.handleSubmit(); }}>

          {/* Renderizado de campos dinámicos */}
          {fields.map((fieldUnit) => (
            <DynamicField key={fieldUnit.name} field={fieldUnit} form={form} />
          ))}
          {/* Alertas Errores, Tanstack Form */}
          <form.Subscribe selector={(state) => state.errors}
            children={(errors) =>
              errors.length > 0 && (
                <p className="text-red-500 text-sm mt-2">{errors}</p>
              )
            }
          />
          {/* Botones de acción, Tanstack Form */}
          <form.Subscribe selector={(state) => [state.canSubmit]}
            children={([canSubmit]) => (
              <div className="flex items-center justify-between mt-6">
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className={`${!canSubmit
                    ? 'bg-gray-400'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                    } text-white font-bold py-2 px-4 rounded-md transition-all`}
                >
                  Guardar
                </button>
                <button
                  type="reset"
                  onClick={() => form.reset()}
                  className="text-indigo-600 hover:underline"
                >
                  Restablecer
                </button>
              </div>
            )}
          />
        </form>
      </Modal>
    </>
  )
};

ActionModal.propTypes = {
  title: PropTypes.string.isRequired, // Título del modal
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired, // Nombre del campo
      label: PropTypes.string.isRequired, // Etiqueta del campo
      icon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]), // Icono del campo (puede ser un objeto o una string)
      type: PropTypes.oneOf(['text', 'textarea', 'select', 'array', 'fields']), // Tipo de campo
      enum: PropTypes.arrayOf(PropTypes.string), // Opciones para selects
      itemType: PropTypes.oneOf(['text', 'select']), // Tipo de ítem dentro de arrays
      fields: PropTypes.array, // Subcampos para arrays de tipo "fields"
      default: PropTypes.any, // Valor por defecto del campo
      validation: PropTypes.any, // Validación (usualmente esquema zod)
      noEditable: PropTypes.bool, // Indica si el campo no es editable
    })
  ).isRequired, // Array de campos dinámicos
  functionApi: PropTypes.func.isRequired, // Función que se ejecuta al enviar el formulario
  defaultValues: PropTypes.object, // Valores iniciales opcionales
  cssbutton: PropTypes.string, // Clases CSS opcionales para el botón
};


export default ActionModal