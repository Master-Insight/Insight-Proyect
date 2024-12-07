import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';
import { styles, variant } from '../../../config/layout';
import TextEditor from '../../modules/textEditor/TextEditor';
import { z } from 'zod';
import DOMPurify from 'dompurify';

/**
 * ActionModalTextEditor es un modal genérico para manejar texto enriquecido con un editor visual.
 * Props:
 * - title: Título del modal
 * - field: Configuración del campo { name, label, default, validation }
 * - functionApi: Función a ejecutar al guardar los cambios
 */

const ActionModalTextEditor = ({ title, field, functionApi }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(field.default);
  const [error, setError] = useState(null);

  const sanitizeHtml = (html) => DOMPurify.sanitize(html);

  const handleSave = async () => {
    try {
      const sanitizedValue = sanitizeHtml(value);
      const parsedValue = field.validation.parse(sanitizedValue);
      await functionApi(parsedValue);
      setOpen(false);
      setError(null);
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
        className={`${variant.primary} ${styles.button}`}
        onClick={() => setOpen(true)}
      >
        {field.label}
      </button>

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

export default ActionModalTextEditor;
