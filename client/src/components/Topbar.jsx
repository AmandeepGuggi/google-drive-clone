import { FaPlus, FaSearch } from "react-icons/fa";
import ProfileMenu from "./ProfileMenu";
import NewMenu from "./NewMenu";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utility";

export default function Topbar({
  showProfile,
  onProfileClose,
  onProfileToggle
}) {

  const profileRef = useRef(null);
   const navigate = useNavigate();

   const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("Guest User");
  const [userEmail, setUserEmail] = useState("guest@example.com");

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

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(`${BASE_URL}/user`, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          // Set user info if logged in
          setUserName(data.name);
          setUserEmail(data.email);
          setLoggedIn(true);
        } else if (response.status === 401) {
          // User not logged in
          setUserName("Guest User");
          setUserEmail("guest@example.com");
          setLoggedIn(false);
        } else {
          // Handle other error statuses if needed
          console.error("Error fetching user info:", response.status);
        }
      } catch (err) {
        console.error("Error fetching user info:", err);
      }
    }
    fetchUser();
  }, [BASE_URL]);

    const handleLogout = async () => {
      console.log("logout clicked");
    try {
      const response = await fetch(`${BASE_URL}/user/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        console.log("Logged out successfully");
        // Optionally reset local state
        setLoggedIn(false);
        setUserName("Guest User");
        setUserEmail("guest@example.com");
        navigate("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      onProfileClose()
    }
  };

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-primary relative">
      <div className="flex items-center md:block w-full mr-4 px-4 py-2 rounded-full bg-secondary outline-none">
        <FaSearch className="inline mr-2" />
         <input
        className="w-[90%] border-0 outline-0"
        placeholder="Search in Drive"
      />
      </div>

     {/* <div className="rounded-full overflow-hidden w-10 h-10">
       <img
        onClick={onProfileToggle}
        src="/photo2.jpeg"
        className=" object-cover w-full h-full cursor-pointer"
      />
     </div> */}
    <div 
  className="rounded-full overflow-hidden min-w-10 h-10 flex items-center justify-center  bg-orange-400 cursor-pointer"
  onClick={onProfileToggle}
>
  {userName ? (
    <span className="text-sm font-semibold text-white">
      {userName.charAt(0).toUpperCase()}
    </span>
  ) : (
    <img
      src="/photo2.jpeg"
      alt="user"
      className="object-cover w-full h-full"
      onError={() => setImgError(true)}
    />
  )}
</div>


      {showProfile &&  <ProfileMenu handleLogout={handleLogout} loggedIn={loggedIn} userName={userName} userEmail={userEmail} reff={profileRef} />
  }
    </header>
  );
}
