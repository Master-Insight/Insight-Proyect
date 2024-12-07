export const imageHandler = () => {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.onchange = () => {
    const file = input.files[0];
    if (file && file.size <= 2 * 1024 * 1024) { // Limitar a 2 MB
      const reader = new FileReader();
      reader.onload = () => {
        const range = quillRef.current.getSelection();
        quillRef.current.editor.insertEmbed(range.index, 'image', reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('La imagen es demasiado grande. El tamaño máximo permitido es 2 MB.');
    }
  };
  input.click();
};
