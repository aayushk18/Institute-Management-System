import { useState } from 'react';
import Calendar from 'react-calendar';
import { Calendar as CalendarIcon, Clock, Plus, X } from 'lucide-react';
import 'react-calendar/dist/Calendar.css';

const CalendarEvents = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Science Fair',
      description: 'Annual science exhibition by students',
      date: '2024-02-15',
      time: '10:00 AM',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      title: 'Sports Day',
      description: 'Inter-house sports competition',
      date: '2024-02-20',
      time: '8:00 AM',
      color: 'bg-green-500'
    },
    {
      id: 3,
      title: 'Board Exam Preparation',
      description: 'Special preparation classes for board exams',
      date: '2024-02-25',
      time: '9:00 AM',
      color: 'bg-purple-500'
    },
    {
      id: 4,
      title: 'Parent-Teacher Meeting',
      description: 'Monthly parent-teacher conference',
      date: '2024-03-01',
      time: '2:00 PM',
      color: 'bg-orange-500'
    },
    {
      id: 5,
      title: 'Cultural Festival',
      description: 'Annual cultural celebration and performances',
      date: '2024-03-05',
      time: '11:00 AM',
      color: 'bg-indigo-500'
    },
    {
      id: 6,
      title: 'Math Olympiad',
      description: 'State level mathematics competition',
      date: '2024-03-10',
      time: '9:30 AM',
      color: 'bg-red-500'
    },
    {
      id: 7,
      title: 'Staff Development Workshop',
      description: 'Professional development training for teachers',
      date: '2024-03-12',
      time: '1:00 PM',
      color: 'bg-teal-500'
    },
    {
      id: 8,
      title: 'Art Exhibition',
      description: 'Student artwork display and competition',
      date: '2024-03-15',
      time: '10:30 AM',
      color: 'bg-pink-500'
    },
    {
      id: 9,
      title: 'Career Guidance Session',
      description: 'Career counseling for senior students',
      date: '2024-03-18',
      time: '3:00 PM',
      color: 'bg-yellow-500'
    },
    {
      id: 10,
      title: 'Annual Day Rehearsal',
      description: 'Practice session for annual day celebration',
      date: '2024-03-20',
      time: '4:00 PM',
      color: 'bg-cyan-500'
    },
    {
      id: 11,
      title: 'Library Week',
      description: 'Special reading activities and book fair',
      date: '2024-03-22',
      time: '9:00 AM',
      color: 'bg-emerald-500'
    },
    {
      id: 12,
      title: 'Health Checkup Camp',
      description: 'Annual health screening for students',
      date: '2024-03-25',
      time: '8:30 AM',
      color: 'bg-rose-500'
    }
  ]);

  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: ''
  });

  const getEventsForDate = (date) => {
    const dateString = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateString);
  };

  const getUpcomingEvents = () => {
    const today = new Date();
    return events
      .filter(event => new Date(event.date) >= today)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 8); // Show more events
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dayEvents = getEventsForDate(date);
      if (dayEvents.length > 0) {
        return (
          <div className="flex justify-center mt-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          </div>
        );
      }
    }
    return null;
  };

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.time) {
      const event = {
        id: Date.now(),
        ...newEvent,
        color: 'bg-blue-500'
      };
      setEvents([...events, event]);
      setNewEvent({ title: '', description: '', date: '', time: '' });
      setShowAddEvent(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const upcomingEvents = getUpcomingEvents();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 relative">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Upcoming Events</h2>
          <button
            onClick={() => setShowCalendar(!showCalendar)}
            className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            View Calendar
          </button>
        </div>
      </div>

      {/* Events List */}
      <div className="p-6 space-y-6 max-h-96 overflow-y-auto">
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map((event) => (
            <div key={event.id} className="flex items-start space-x-4 hover:bg-gray-50 p-3 rounded-lg transition-colors">
              {/* Calendar Icon */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                  <CalendarIcon size={24} className="text-blue-600" />
                </div>
              </div>
              
              {/* Event Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {event.title}
                </h3>
                <p className="text-gray-600 mb-3 leading-relaxed">
                  {event.description}
                </p>
                <div className="flex items-center text-gray-500">
                  <Clock size={16} className="mr-2" />
                  <span className="font-medium">
                    {formatDate(event.date)}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <CalendarIcon size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No upcoming events scheduled.</p>
          </div>
        )}
      </div>

      {/* Calendar Overlay */}
      {showCalendar && (
        <div className="absolute top-0 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-[600px] overflow-y-auto">
          {/* Calendar Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50 rounded-t-xl">
            <h3 className="text-lg font-semibold text-gray-900">Calendar</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowAddEvent(true)}
                className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                <Plus size={16} className="mr-1" />
                Add Event
              </button>
              <button
                onClick={() => setShowCalendar(false)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Calendar Content */}
          <div className="p-4">
            <div className="calendar-container">
              <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                tileContent={tileContent}
                className="w-full border-0"
              />
            </div>

            {/* Selected Date Events */}
            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 mb-3 text-lg">
                Events on {selectedDate.toLocaleDateString()}
              </h4>
              {getEventsForDate(selectedDate).length > 0 ? (
                <div className="space-y-3">
                  {getEventsForDate(selectedDate).map((event) => (
                    <div key={event.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                      <h5 className="font-semibold text-gray-900 mb-1">{event.title}</h5>
                      <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock size={14} className="mr-1" />
                        {event.time}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500">No events scheduled for this date.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Event Modal */}
      {showAddEvent && (
        <div className="absolute top-0 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-xl z-50">
          <div className="p-4 border-b border-gray-100 bg-gray-50 rounded-t-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Add New Event</h3>
              <button
                onClick={() => setShowAddEvent(false)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Title
              </label>
              <input
                type="text"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter event title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                placeholder="Enter event description"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time
                </label>
                <input
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                onClick={() => setShowAddEvent(false)}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEvent}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Add Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarEvents;