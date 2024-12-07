import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';
import { styles, variant } from '../../../config/layout';
import TextEditor from '../../modules/textEditor/TextEditor';
import { z } from 'zod';
import DOMPurify from 'dompurify';

/**
 * Componente ActionModalTextEditor
 * Modal genérico para manejar texto enriquecido con un editor visual.
 * 
 * Props:
 * - title (string): Título del modal.
 * - buttonTitle (string, opcional): Texto del botón que abre el modal. Por defecto, "Editar".
 * - field (object): Configuración del campo con las propiedades:
 *   - name (string): Nombre del campo.
 *   - label (string): Etiqueta para el campo.
 *   - default (string): Valor inicial del campo.
 *   - validation (Zod schema): Validación del campo.
 * - functionApi (func): Función asíncrona para guardar los cambios.
 * - cssbutton (string, opcional): Clases CSS adicionales para el botón.
 * - children (node, opcional): Contenido personalizado del botón.
 */

const ActionModalTextEditor = ({ title, buttonTitle, field, functionApi, cssbutton, children }) => {

  // Estados locales
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(field.default);
  const [error, setError] = useState(null);

  // Función para sanitizar HTML antes de procesarlo
  const sanitizeHtml = (html) => DOMPurify.sanitize(html);

  // Maneja la acción de guardar
  const handleSave = async () => {
    try {
      const sanitizedValue = sanitizeHtml(value); // Sanitiza el texto ingresado
      const parsedValue = field.validation.parse(sanitizedValue); // Valida el texto con Zod
      await functionApi(parsedValue); // Llama la función proporcionada para guardar
      setOpen(false); // Cierra el modal
      setError(null); // Limpia los errores
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else {
        console.error('Error al guardar:', err);
        setError('Error inesperado al guardar.');
      }
    }
  };


  return (
    <>
      {/* Botón para abrir el modal */}
      <button
        className={cssbutton || `${variant.primary} ${styles.button}`}
        onClick={() => setOpen(true)}
      >
        {children || buttonTitle || "Editar"}
      </button>

      {/* Modal para editar el texto */}
      <Modal title={title} isOpen={open} onClose={() => setOpen(false)}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            {field.label}
          </label>
          <TextEditor
            value={value}
            onChange={setValue}
            placeholder={`Escribe aquí el texto para ${field.label}`}
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        {/* Botones del modal */}
        <div className="flex justify-end space-x-2">
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded"
            onClick={() => setOpen(false)}
          >
            Cancelar
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
            onClick={handleSave}
          >
            Guardar
          </button>
        </div>
      </Modal>
    </>
  );
};

// Validación de PropTypes
ActionModalTextEditor.propTypes = {
  title: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string,
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    default: PropTypes.string.isRequired,
    validation: PropTypes.object.isRequired,
  }).isRequired,
  functionApi: PropTypes.func.isRequired,
  cssbutton: PropTypes.string,
  children: PropTypes.node,
};

export default ActionModalTextEditor;
