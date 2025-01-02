import dayjs from "dayjs";

const CardUser = ({ item, config }) => {
  const {
    _id,
    full_name,
    role,
    photo,
    connection,
  } = item;



  // Renderizado componente
  return (
    <div className="w-full px-4 py-2 bg-white rounded shadow-lg mx-auto flex gap-4">
      <img src={photo} className="h-8 w-8 object-contain" />
      <p>{full_name} - {role}</p>
      <p> - Ultima conección: {connection}</p>
    </div>
  )
}


export default CardUser