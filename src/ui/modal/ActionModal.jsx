import React, { useState } from 'react'
import { useForm } from '@tanstack/react-form';
import Modal from './Modal';
import { icons } from '../../../config/layout';
import { Icon } from '@iconify/react';
import { z } from 'zod';
import { zodValidator } from '@tanstack/zod-form-adapter';
import PropTypes from 'prop-types';

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
  * Campo genérico (text, number, date, etc.)
  {
    name: "title",
    label: "Titulo",
    icon: BiBookmark,
    type: "text",  // Puede ser cualquier tipo básico como "text", "number", "date", etc.
    default: "Aquí va un titulo",
    validation: z.string().min(5, "El titulo debe tener al menos 5 caracteres")
  },

  * Campo Textarea
  {
    name: "description",
    label: "Descripción",
    icon: null,
    type: "textarea",
    default: "",
    validation: z.string().min(10, "La descripción debe tener al menos 10 caracteres")
  },

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

  * Array de objetos (cada elemento tiene varios campos)
  {
    name: "socialLinks",
    label: "Redes Sociales",
    icon: BiLink,
    type: "array",  // Es un array
    itemType: "fields",  // Indica que cada ítem es un objeto con varios campos
    fields: [  // Campos dentro de cada objeto del array
      {
        name: "platform",
        label: "Plataforma",
        type: "select",
        enum: ["GitHub", "LinkedIn", "Twitter", "Facebook"],
        validation: z.enum(["GitHub", "LinkedIn", "Twitter", "Facebook"])
      },
      {
        name: "url",
        label: "URL",
        type: "text",
        validation: z.string().url("Debe ser una URL válida")
      }
    ],
    default: [{ platform: "GitHub", url: "https://github.com/usuario" }],
    validation: z.array(
      z.object({
        platform: z.enum(["GitHub", "LinkedIn", "Twitter", "Facebook"]),
        url: z.string().url()
      })
    ).min(1, "Debe haber al menos un enlace de red social")
  }
];
*/

/**
 * Subcomponente para renderizar los campos dinámicos del formulario.
*/
const DynamicField = ({ field, form, parentName }) => {
  const { name, label, icon, type, enum: enumOptions, itemType, fields: subFields, noEditable } = field;

  if (noEditable) { return }

  // Construir el nombre completo del campo con el prefijo del padre si existe
  const fieldName = parentName ? `${parentName}.${name}` : name;

  // Renderiza el campo según el tipo definido
  return (
    <form.Field key={fieldName} name={fieldName}>
      {({ state, handleChange }) => {
        //console.log({label, type, itemType, state})
        return (
          <div className="my-3">
            <label htmlFor={fieldName} className="block mb-2 text-gray-700">
              {icon && <Icon icon={icon} className="inline-block mr-2" />}
              <span dangerouslySetInnerHTML={{ __html: label }} />:
            </label>

            {/* Textarea */}
            {type === 'textarea' ? (
              <textarea
                id={fieldName}
                value={state.value}
                className={`w-full border p-2 rounded-md ${state.meta.errors.length > 0 ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-blue-500`}
                onChange={(e) => handleChange(e.target.value)}
              />
            ) : /* Select */
              type === 'select' ? (
                <select
                  id={fieldName}
                  value={state.value || ""}
                  className="w-full border p-2 rounded-md"
                  onChange={(e) => handleChange(e.target.value)}
                >
                  {enumOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  )
                  )}
                </select>
              ) : /* Array de textos */
                type === 'array' && itemType === 'text' ? (
                  <div>
                    {state.value.map((item, index) => (
                      <div key={index} className="flex gap-2 my-2 items-center">
                        <input
                          type="text"
                          value={item}
                          className="w-full border p-2 rounded-md"
                          onChange={(e) => {
                            const newValue = [...state.value];
                            newValue[index] = e.target.value;
                            handleChange(newValue);
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newValue = state.value.filter((_, i) => i !== index);
                            handleChange(newValue);
                          }}
                          className="text-red-500 ml-2"
                        >
                          <Icon icon={icons.x} />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleChange([...state.value, ''])}
                      className="text-blue-500 mt-2"
                    >
                      Agregar <Icon icon={icons.addEle} className='inline-block' />
                    </button>
                  </div>
                ) : /* Array de select */
                  type === 'array' && itemType === 'select' ? (
                    <div>
                      {state.value.map((item, index) => (
                        <div key={index} className="flex gap-2 my-2 items-center">
                          <select
                            value={item}
                            className="w-full border p-2 rounded-md"
                            onChange={(e) => {
                              const newValue = [...state.value];
                              newValue[index] = e.target.value;
                              handleChange(newValue);
                            }}
                          >
                            <option value="" disabled>Seleccionar</option>
                            {enumOptions.map((option, idx) => (
                              <option key={idx} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                          <button
                            type="button"
                            onClick={() => {
                              const newValue = state.value.filter((_, i) => i !== index);
                              handleChange(newValue);
                            }}
                            className="text-red-500 ml-2"
                          >
                            <Icon icon={icons.x} />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => handleChange([...state.value, ''])}
                        className="text-blue-500 mt-2"
                      >
                        Agregar <Icon icon={icons.addEle} className='inline-block' />
                      </button>
                    </div>
                  ) : /* Array de fields (subcampos) */
                    type === 'array' && itemType === 'fields' ? (
                      <div>
                        {state.value.map((item, index) => (
                          <div key={index} className="my-3 border rounded-md p-2">
                            <h4 className="font-semibold mb-2">Subgrupo {index + 1}</h4>
                            {subFields.map((subField) => (
                              <DynamicField
                                key={`${index}-${subField.name}`}
                                field={subField}
                                form={form}
                                parentName={`${fieldName}[${index}]`}
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
                    ) : /* Campos básicos */
                      (<input
                        id={fieldName}
                        type={type || 'text'}
                        value={state.value}
                        className={`w-full border p-2 rounded-md ${state.meta.errors.length > 0 ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-blue-500`}
                        onChange={(e) => handleChange(e.target.value)}
                      />
                      )}
          </div>
        )
      }}
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

const ActionModal = ({ title, fields, functionApi, defaultValues, cssbutton = null }) => {
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
      //console.log(value);

      functionApi && functionApi(value); // Llama a la API
      handleCloseModal();
    }
  })

  // Controlar apertura/cierre del modal
  const handleEditClick = () => setIsModalOpen(true);
  const handleCloseModal = () => { setIsModalOpen(false); form.reset(); };

  return (
    <>
      {/* Botón para abrir el modal */}
      <button onClick={handleEditClick}
        className={cssbutton || "px-4 py-2 bg-primary text-white rounded-md flex items-center hover:bg-primary-darker transition-all"}>
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