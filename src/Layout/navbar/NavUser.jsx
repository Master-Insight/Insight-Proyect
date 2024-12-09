import { crearURLCompleta } from "../../utils/urifoto";
import { useRouteContext } from "@tanstack/react-router";

export default function NavUser() {
  // const { currentUser } = useRouteContext()
  const selected = useRouteContext({
    select: (context) => context.currentUser,
  })
  // console.log("selected: ", selected)
  const currentUser = selected?.data || null
  // console.log("currentUser: ", currentUser)

  let initials = (currentUser?.given_name?.charAt(0) || "X") + (currentUser?.family_name?.charAt(0) || "")

  return (
    <div className="flex items-center space-x-2">
      {currentUser?.photo
        ? (
          <img className='flex justify-center items-center font-bold rounded-full w-8 h-8'
            src={currentUser.photo}
            alt="User Avatar"
          />)
        : <span className='flex justify-center items-center bg-primary text-white font-bold rounded-full w-8 h-8 uppercase'>
          {initials ? initials : "?"}
        </span>
      }

      <div className="flex flex-col items-center justify-center">
        <span className="text-primary font-medium"> {currentUser?.full_name || null} </span>
        <span className="text-primary-darker font-bold"> {currentUser?.role || null} </span>
      </div>
    </div>
  );
}