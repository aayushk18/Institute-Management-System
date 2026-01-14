import { useState, useEffect } from 'react';
import { 
  Home, 
  BookOpen, 
  UserCheck, 
  ClipboardList, 
  CreditCard, 
  Library, 
  Settings,
  Menu,
  X
} from 'lucide-react';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const navigationItems = [
    { name: 'Home', icon: Home },
    { name: 'Class & subjects', icon: BookOpen },
    { name: 'Attendance', icon: UserCheck },
    { name: 'Assessment', icon: ClipboardList },
    { name: 'Payments', icon: CreditCard },
    { name: 'Library', icon: Library },
    { name: 'Settings', icon: Settings },
  ];

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (itemName) => {
    setActiveSection(itemName);
    if (isMobile) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        ${isMobile ? 'fixed' : 'relative'} 
        ${isOpen ? (isMobile ? 'w-64' : 'w-64') : (isMobile ? '-translate-x-full' : 'w-16')} 
        ${isMobile ? 'left-0 top-0 h-full z-50' : 'h-screen'}
        bg-slate-600 transition-all duration-300 ease-in-out flex flex-col
        ${isMobile && !isOpen ? 'transform' : ''}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-500">
          <h1 className={`text-white font-semibold text-lg ${(!isOpen && !isMobile) && 'hidden'}`}>
            Teacher Dashboard
          </h1>
          <button
            onClick={toggleSidebar}
            className="text-white hover:bg-slate-500 p-1 rounded transition-colors"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <li key={item.name}>
                  <button
                    onClick={() => handleItemClick(item.name)}
                    className={`w-full flex items-center px-4 py-3 text-left hover:bg-slate-500 transition-colors ${
                      activeSection === item.name ? 'bg-slate-500 border-r-2 border-white' : ''
                    }`}
                  >
                    <IconComponent 
                      size={20} 
                      className="text-white flex-shrink-0" 
                    />
                    <span className={`ml-3 text-white font-medium ${(!isOpen && !isMobile) && 'hidden'}`}>
                      {item.name}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Mobile Menu Button - Fixed position for mobile */}
      {isMobile && !isOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-30 md:hidden bg-slate-600 text-white p-2 rounded-lg shadow-lg hover:bg-slate-700 transition-colors"
        >
          <Menu size={20} />
        </button>
      )}
    </>
  );
};

export default Sidebar;