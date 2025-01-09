import dayjs from "dayjs";

const CardService = ({ item, config }) => {
  const {
    slug,
    title,
    description,
    image,
  } = item;



  // Renderizado componente
  return (
    <div className="w-full px-4 py-2 bg-white rounded shadow-lg mx-auto flex gap-4">
      {/* <img src={image} className="h-8 w-8 object-contain" /> */}
      <h3 className="font-bold text-primary">{title}</h3>
      <p>{description}</p>
    </div>
  )
}


export default CardService