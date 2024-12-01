import { useRouter } from '@tanstack/react-router';
import React from 'react';
import { Icon } from '@iconify/react';

const BackButton = () => {
  const router = useRouter()

  const handleClick = () => {
    router.history.back()
  };

  return (
    <button
      onClick={handleClick}
      className="absolute top-4 left-6 p-2 bg-gray-800 text-white rounded-full shadow-md hover:bg-gray-700 transition duration-300 flex items-center print:hidden"
    >
      <Icon icon={"ic:outline-arrow-back"} className="size-6" />
      <span className="ml-2 text-sm font-semibold">Volver</span>
    </button>
  );
};

export default BackButton;