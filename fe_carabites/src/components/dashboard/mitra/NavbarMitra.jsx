import { useState, useEffect, useRef } from 'react';
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import Notifikasi from '../PopNotifikasi';

const NavbarMitra = ({ showSearchBar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Reference to the dropdown for detecting outside clicks
  const notificationRef = useRef(null); // Reference for notification dropdown
  const navigate = useNavigate();
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Fetch user data from localStorage
  const userData = JSON.parse(localStorage.getItem('user')) || {}; // Default to empty object if not found

  const handleLogout = () => {

    alert("You are being logged out. Please wait...");

    setTimeout(() => {

      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      sessionStorage.clear();

      navigate('/');

    }, 1000);
  };

  const [showNotification, setShowNotification] = useState(false);

  const toggleNotification = () => {
    setShowNotification(!showNotification);

    // Mark all notifications as read
    setUnreadNotifications(prevState => prevState.map(() => false));
  };

  // State for unread notifications
  const [unreadNotifications, setUnreadNotifications] = useState([true, true, true, true]);

  // Mark notification as read when clicked
  const markAsRead = (index) => {
    setUnreadNotifications(prevState => {
      const updatedNotifications = [...prevState];
      updatedNotifications[index] = false;
      return updatedNotifications;
    });
  };

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    // Adjust notification dropdown position dynamically
    const adjustNotificationPosition = () => {
      if (notificationRef.current) {
        const dropdown = notificationRef.current;
        const rect = dropdown.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const offsetBottom = viewportHeight - rect.bottom;

        // Check if dropdown exceeds the viewport and adjust
        if (offsetBottom < 0) {
          dropdown.style.top = `-100px`; // Move dropdown above if it goes out of screen
        } else {
          dropdown.style.top = '100%'; // Default position below the button
        }
      }
    };

    adjustNotificationPosition();
    window.addEventListener('resize', adjustNotificationPosition);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener('resize', adjustNotificationPosition);
    };
  }, [showNotification]);

  return (
    <nav className="ml-[280px] fixed top-0 left-0 right-0 m-5 mx-10 bg-white p-3 shadow-md rounded-md flex items-center justify-between z-50">
      {showSearchBar && (
        <div className="flex items-center bg-gray-100 rounded-lg p-2 shadow-sm w-full max-w-xs">
          <div className="bg-[#45c517] p-2 rounded-lg">
            <FaSearch className="text-white" />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="ml-2 bg-transparent outline-none text-gray-600 placeholder-gray-400"
          />
        </div>
      )}

      {!showSearchBar && userData.nama_user && (
        <h1 className='text-xl font-semibold'>Welcome, {userData.nama_user}!</h1>
      )}

      <ul className=" flex items-center gap-5">
        <div className="relative">
          <button
            onClick={toggleNotification}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="gray"
              className="cursor-pointer"
            >
              <path d="M18 10C18 6.68629 15.3137 4 12 4C8.68629 4 6 6.68629 6 10V18H18V10ZM20 18.6667L20.4 19.2C20.5657 19.4209 20.5209 19.7343 20.3 19.9C20.2135 19.9649 20.1082 20 20 20H4C3.72386 20 3.5 19.7761 3.5 19.5C3.5 19.3918 3.53509 19.2865 3.6 19.2L4 18.6667V10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10V18.6667ZM9.5 21H14.5C14.5 22.3807 13.3807 23.5 12 23.5C10.6193 23.5 9.5 22.3807 9.5 21Z" />
            </svg>
            {/* Unread notification indicator */}
            {unreadNotifications.some(status => status) && (
              <div className="absolute top-3 left-3 translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-red-500 rounded-full" />
            )}
          </button>

          {/* Notification dropdown */}
          <div
            ref={notificationRef}
            className={`absolute left-2 mt-2 w-72 z-1 transition-all duration-300 max-h-[300px] overflow-y-auto ${showNotification ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
            style={{ position: 'absolute', top: '100%' }}
          >
            <Notifikasi markAsRead={markAsRead} unreadNotifications={unreadNotifications} />
          </div>
        </div>

        <div className="flex items-center gap-2 relative" ref={dropdownRef}>
          <div className="border-2 border-[#45c517] rounded-full">
            <img
              src={userData?.avatar || '../../../../public/profile.png'}  // Default image if not found
              alt="User Avatar"
              className="min-w-5 h-5 object-cover rounded-full"
            />
          </div>

          <div className='flex items-center gap-3'>
            <div>
              <h1>{userData.nama_user || "User"}</h1>
              <h1 className="text-xs">{userData.alamat || "Malang, Indonesia"}</h1>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              onClick={toggleDropdown}
              className="cursor-pointer"
            >
              <path d="M12 16L6 10H18L12 16Z"></path>
            </svg>
          </div>

          {isDropdownOpen && (
            <div className="absolute right-0 top-12 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <ul className="py-1">
                <Link to="/profile">
                  <li className="px-4 py-2 hover:bg-[#45c517] hover:text-white cursor-pointer">
                    Profile
                  </li>
                </Link>

                <li className="px-4 py-2 hover:bg-[#45c517] hover:text-white cursor-pointer">
                  Help & Support
                </li>
                <a onClick={handleLogout}>
                  <li className="px-4 py-2 hover:bg-[#45c517] hover:text-white cursor-pointer text-red-600">
                    Logout
                  </li>
                </a>
              </ul>
            </div>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default NavbarMitra;
