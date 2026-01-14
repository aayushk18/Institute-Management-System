import { User, Bell } from 'lucide-react';
import { useAuthStore } from '../../../utils/useAuthStore';
import { useEffect, useRef, useState } from 'react';

const Header = (props) => {

  const user = props.user



  const { logout } = useAuthStore()



  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 py-4">
      <div className="flex items-center justify-end">
        {/* Right Side - User Profile & Notifications */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Notifications - Hidden on small mobile */}
          <button className="hidden xs:block p-2 text-gray-400 hover:text-gray-600 transition-colors relative">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          {/* User Profile */}
          {/* <div className="flex items-center space-x-2 sm:space-x-3">
            <span className="hidden sm:block text-gray-700 font-medium text-sm sm:text-base">
              Aman Singh
            </span>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-500   rounded-full flex items-center justify-center">
              <User size={16} className="sm:w-5 sm:h-5 text-white" />
            </div>
          </div> */}



          <div className='flex flex-row gap-5   content-center'>
            <div className='content-center '>
              <span className='text-xl font-semibold self-center text-gray-500'>{`${user.firstName} ${user.midName} ${user.lastName}`}</span>

            </div>

            <div className="relative   place-items-center  " ref={dropdownRef}>
              <div
                className="bg-gray-500 p-1 rounded-full cursor-pointer hover:bg-gray-600 transition"
                onClick={() => setIsOpen(!isOpen)}
              >
                <User className="text-white    size-6" />
              </div>

              {isOpen && (
                <div className="absolute right-0 mt-2 w-50 bg-white shadow-md border brder-t-2 border-gray-200 rounded-md z-50">
                  <div className="px-4 py-2  hover:bg-gray-100 cursor-pointer text-gray-500 font-semibold">
                    Manage Account
                  </div>
                  <div className="px-4 py-2 text-gray-500 font-semibold hover:bg-gray-100 cursor-pointer"
                    onClick={() => logout()}>
                    Log Out
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;