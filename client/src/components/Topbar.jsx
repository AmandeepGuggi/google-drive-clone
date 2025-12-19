import { FaPlus, FaSearch } from "react-icons/fa";
import ProfileMenu from "./ProfileMenu";
import NewMenu from "./NewMenu";
import { useRef, useEffect } from "react";

export default function Topbar({
  onProfileClick,
  showProfile,
  onProfileClose,
  onProfileToggle
}) {
  const profileRef = useRef(null);
  useEffect(() => {
  if (!showProfile) return;

  function handleOutside(e) {
    if (profileRef.current && !profileRef.current.contains(e.target)) {
      onProfileClose();
    }
  }

  document.addEventListener("mousedown", handleOutside);
  return () => document.removeEventListener("mousedown", handleOutside);
}, [showProfile]);

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-primary relative">
      <div className="flex items-center md:block w-full mr-4 px-4 py-2 rounded-full bg-secondary outline-none">
        <FaSearch className="inline mr-2" />
         <input
        className="w-[90%] border-0 outline-0"
        placeholder="Search in Drive"
      />
      </div>

     <div className="rounded-full overflow-hidden w-10 h-10">
       <img
        onClick={onProfileToggle}
        src="/photo2.jpeg"
        className=" object-cover w-full h-full cursor-pointer"
      />
     </div>

      {showProfile &&  <ProfileMenu reff={profileRef} />
  }
    </header>
  );
}
