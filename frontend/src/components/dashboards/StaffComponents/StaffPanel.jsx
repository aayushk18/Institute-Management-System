import { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MainContent from './components/MainContent';
import { useAuthStore } from '../../utils/useAuthStore';
import { Loader, Loader2 } from 'lucide-react';

function StaffPanel() {
  const [activeSection, setActiveSection] = useState('Home');
  const { authUser } = useAuthStore()

  console.log(authUser);




  if (authUser) {

    return (
      <div className="flex h-screen bg-gray-100 overflow-hidden">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          <Header user={authUser} />
          <MainContent activeSection={activeSection} user={authUser} />
        </div>
      </div>
    );

  } else return (

    <div className="flex items-center justify-center w-full h-64">
      <Loader className="h-20 w-20 animate-spin " />
    </div>
  )

}

export default StaffPanel;