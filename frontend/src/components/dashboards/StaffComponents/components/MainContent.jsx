import { useState } from 'react';
import TeacherProfile from './home/TeacherProfile';
import AttendanceChart from './home/AttendanceChart';
import NoticeBoard from './home/NoticeBoard';
import CalendarEvents from './home/CalendarEvents';
import ClassSubjectsMain from './classes/ClassSubjectsMain';
import AttendanceMain from './attendance/AttendanceMain';

const MainContent = (props) => {

  console.log(props);
  const activeSection = props.activeSection;
  const user = props.user
  const renderContent = () => {
    switch (activeSection) {
      case 'Home':
        return <HomeContent user={user} />;
      case 'Class & subjects':
        return <ClassSubjectsMain />;
      case 'Attendance':
        return <AttendanceMain />;
      default:
        return <HomeContent />;
    }
  };

  return (
    <main className="flex-1 p-4 sm:p-6 bg-gray-50 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        {renderContent()}
      </div>
    </main>
  );
};

const HomeContent = (props) => {
  const user = props.user
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Teacher Dashboard
        </h1>
        <p className="text-gray-600">
          Manage your profile, track attendance, and stay updated with notices and events.
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Teacher Profile */}
        <div className="lg:col-span-2">
          <TeacherProfile user={user} />
        </div>

        {/* Right Column - Attendance Chart */}
        <div className="lg:col-span-1">
          <AttendanceChart />
        </div>
      </div>

      {/* Bottom Row - Notice Board and Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NoticeBoard />
        <CalendarEvents />
      </div>
    </div>
  );
};

export default MainContent;