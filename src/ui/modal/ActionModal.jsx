import PropTypes from 'prop-types';
import { useState } from 'react'
import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { z } from 'zod';
import { Icon } from '@iconify/react';
import amStyles, { amIcons, amVariant } from './ActionModal/styles';
import Modal from './Modal';
import DynamicField from './ActionModal/DinamycField';

/**
 * CreateModal Componente Boton que abre un modal con opciones para rellenar (titulo, descripcion, etc) y que al "guardar" ejecuta una función
 * @param {string} title - Título del modal
 * @param {function} functionApi - Función API que se ejecuta en el submit
 * @param {array} fields - Arreglo de campos dinámicos a renderizar en el formulario
 */

/* GUIA DE FIELDS
const fields = [
  * Campo genérico (text, number, date, etc.)  -> GenericField
  * Campo Textarea -> TextAreaField
  * Campo Select (opciones limitadas) -> SelectField
  * Campo Array (lista de valores) -> ArrayTextField
  * Campo Array (lista de enum) -> ArraySelectField
  * Campo Array (lista de objetos) -> ArrayObjectSelectField
  * Array de objetos (cada elemento tiene varios campos) -> ...
*/

// ? Ejemplo
/* const config = [
  {
    name: 'username',
    label: 'Nombre de usuario',
    icon: icons.user,
    type: 'text',
    default: '',
    validation: z.string().min(1, 'El nombre de usuario es requerido').max(50, 'Máximo 50 caracteres'),
  },
  {
    name: 'email',
    label: 'Correo electrónico',
    icon: icons.email,
    type: 'text',
    default: '',
    validation: z.string().email('Debe ser un correo electrónico válido'),
  },
  {
    name: 'role',
    label: 'Rol',
    icon: icons.role,
    type: 'select',
    enum: ['admin', 'editor', 'viewer'],
    default: 'viewer',
    validation: z.enum(['admin', 'editor', 'viewer']),
  },
  {
    name: 'tags',
    label: 'Etiquetas',
    icon: icons.tags,
    type: 'array',
    itemType: 'text',
    default: [],
    validation: z.array(z.string()).max(10, 'Máximo 10 etiquetas'),
  },
];
*/

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
        className={`${amVariant[cssbutton]} ${amStyles.button}`}>
        {title}
        <Icon icon={amIcons.plus} className="inline-block ml-2" />
      </button>

      {/* Modal con formulario dinámico */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={title}>
        <form onSubmit={(e) => { e.preventDefault(); form.handleSubmit(); }}>

          {/* Renderizado de campos dinámicos */}
          {fields.map((fieldUnit) => (
            fieldUnit.noEditable ? null : <DynamicField key={fieldUnit.name} field={fieldUnit} form={form} />
          ))}

          {/* Alertas Errores, Tanstack Form */}
          <form.Subscribe selector={(state) => state.errors}
            // eslint-disable-next-line react/no-children-prop
            children={(errors) =>
              errors.length > 0 && (
                <p className="text-red-500 text-sm mt-2">{errors}</p>
              )
            }
          />

          {/* Botones de acción, Tanstack Form */}
          <form.Subscribe selector={(state) => [state.canSubmit]}
            // eslint-disable-next-line react/no-children-prop
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
      icon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]), // Icono del campo -- string de https://icon-sets.iconify.design/
      type: PropTypes.oneOf(['generic', 'textarea', 'select', 'array', 'fields']).isRequired, // Tipo de campo
      enum: PropTypes.arrayOf(PropTypes.string), // Opciones para selects
      itemType: PropTypes.oneOf(['text', 'select']), // Tipo de ítem para arrays
      fields: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
      })), // Subcampos para arrays de tipo "fields"
      default: PropTypes.any, // Valor por defecto
      validation: PropTypes.instanceOf(z.ZodType), // Validación
      noEditable: PropTypes.bool, // Indica si el campo no es editable
    })
  ).isRequired, // Campos dinámicos
  functionApi: PropTypes.func.isRequired, // Función que se ejecuta en submit
  defaultValues: PropTypes.object, // Valores iniciales
  cssbutton: PropTypes.string, // Clase CSS del botón
};

export default ActionModal