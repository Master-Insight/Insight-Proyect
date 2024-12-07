import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { imageHandler } from './imageHandler';

// Opciones de botones de la barra de herramientas
const toolbar = {
  full: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],
    [{ 'direction': 'rtl' }],
    [{ 'size': ['small', 'medium', 'large', 'huge'] }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'align': [] }],
    ['bold', 'italic', 'underline'],
    ['link', 'image'],
    ['clean']
  ],
  inline: [
    ['bold', 'italic', 'underline', 'strike'],
    ['link'],
    ['image']
  ],
  simple: [
    [{ 'font': [] }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],
    [{ 'size': ['small', 'medium', 'large', 'huge'] }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'align': [] }],
    ['bold', 'italic', 'underline'],
    ['link', 'image'],
    ['clean']
  ],
}

const TextEditor = ({ value, onChange, configuration = "simple" }) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: toolbar[configuration]
        },
        placeholder: 'Escribe aquí...',
        readOnly: false,
        handlers: imageHandler,
      });

      quillRef.current.on('text-change', () => {
        onChange(quillRef.current.root.innerHTML);
      });
    }

    return () => {
      if (quillRef.current) {
        quillRef.current.off('text-change');
      }
    };
  }, [onChange]);

  // useEffect(() => {
  //   if (quillRef.current) {
  //     // Preserve the cursor position while updating content
  //     const range = quillRef.current.getSelection();
  //     const delta = quillRef.current.getContents();
  //     quillRef.current.setContents(delta, 'silent');
  //     if (range) {
  //       quillRef.current.setSelection(range.index, range.length);
  //     }
  //   }
  // }, [value]);

  useEffect(() => {
    if (quillRef.current && value !== quillRef.current.root.innerHTML) {
      quillRef.current.clipboard.dangerouslyPasteHTML(value);
    }
  }, [value]);

  return <div className='min-h-64' ref={editorRef} />;
};

export default TextEditor;
