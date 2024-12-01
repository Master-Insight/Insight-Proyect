import React, { useState } from 'react'
import { useForm } from '@tanstack/react-form';
import Modal from './Modal';
import { BiSolidPlusSquare } from 'react-icons/bi';
/**
 * ActionModalAreaText
 * Componente que abre un modal con campos dinámicos (como título y descripción) para rellenar,
 * y ejecuta una función API cuando se presiona "Guardar".
 * @param {string} title - Título del modal
 * @param {function} functionApi - Función API que se ejecuta al hacer submit
 * @param {array} fields - Array de objetos de campos que se renderizan dinámicamente en el formulario
 * @param {array} actionButtons - Array de botones de acción con etiquetas y funciones
 */

/* GUIA DE FIELDS
  * Campo Textarea
  {
    name: "description",
    label: "Descripción",
    icon: null,
    type: "textarea",
    default: "",
    validation: z.string().min(10, "La descripción debe tener al menos 10 caracteres")
  }
*/

/**
 * Subcomponente para renderizar los campos dinámicos del formulario.
*/
const DynamicField = ({ field, form, parentName, actionButtons }) => {
  const { name, label, icon: Icon, noEditable } = field;

  if (noEditable) return null;

  const fieldName = parentName ? `${parentName}.${name}` : name;

  return (
    <form.Field key={fieldName} name={fieldName}>
      {(field) => (
        <div className="my-3">
          <label htmlFor={fieldName} className="block mb-2 text-gray-700">
            {Icon && <Icon className="inline-block mr-2" />}
            <span dangerouslySetInnerHTML={{ __html: label }} />:
          </label>

          <textarea
            id={fieldName}
            value={field.state.value}
            className={`w-full border p-2 rounded-md ${
              field.state.meta.errors.length > 0 ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:border-blue-500`}
            onChange={(e) => field.handleChange(e.target.value)}
          />
          <div className="flex flex-col gap-2 mt-6">
            {actionButtons &&
              actionButtons.map((button, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => field.setValue(button.function(field.state.value))}
                  className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-md transition-all"
                >
                  {button.label}
                </button>
              ))}
          </div>
        </div>
      )}
    </form.Field>
  );
};



const ActionModalAreaText = ({ title, fields, functionApi, actionButtons}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Valores por defecto generados dinámicamente
  const configDefaultValues = fields.reduce((acc, field) => {
    if (field.default) {
      acc[field.name] = field.default;
    }
    return acc;
  }, {})
  
  // Configuración de Tanstack Form
  const form = useForm({
    defaultValues: configDefaultValues,
    onSubmit: ({value}) => {
      //console.log(value);
      
      functionApi && functionApi(value); // Llama a la API
      handleCloseModal();
    }
  })

  // Controlar apertura/cierre del modal
  const handleEditClick  = () => setIsModalOpen(true);
  const handleCloseModal = () => { setIsModalOpen(false); form.reset(); };

  return (
    <>
      {/* Botón para abrir el modal */}
      <button onClick={handleEditClick}
          className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center hover:bg-blue-600 transition-all">
          {title}
          <BiSolidPlusSquare className="ml-2" />
      </button>

      {/* Modal con formulario dinámico */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={title}>
      <form onSubmit={(e) => { e.preventDefault(); form.handleSubmit(); }}>

          {/* Renderizado de campos dinámicos */}
          {fields.map((fieldUnit) => (
            <DynamicField key={fieldUnit.name} field={fieldUnit} form={form} actionButtons={actionButtons}/>
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
                  className={`${
                    !canSubmit
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

export default ActionModalAreaText