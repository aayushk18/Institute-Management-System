import { useState } from 'react';
import { Bell, Pin, Calendar, ChevronRight, Filter } from 'lucide-react';

const NoticeBoard = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const notices = [
    {
      id: 1,
      title: 'Staff Meeting - Curriculum Review',
      content: 'All teaching staff are required to attend the curriculum review meeting scheduled for next week.',
      category: 'meeting',
      priority: 'high',
      date: '2024-01-15',
      time: '10:00 AM',
      isPinned: true,
      author: 'Principal Office'
    },
    {
      id: 2,
      title: 'New Assessment Guidelines',
      content: 'Updated assessment guidelines have been released. Please review the new grading criteria.',
      category: 'academic',
      priority: 'medium',
      date: '2024-01-12',
      time: '2:30 PM',
      isPinned: false,
      author: 'Academic Department'
    },
    {
      id: 3,
      title: 'Holiday Schedule Update',
      content: 'The holiday schedule for the upcoming semester has been updated. Check the calendar for details.',
      category: 'general',
      priority: 'low',
      date: '2024-01-10',
      time: '9:15 AM',
      isPinned: true,
      author: 'Administration'
    },
    {
      id: 4,
      title: 'Professional Development Workshop',
      content: 'Register for the upcoming professional development workshop on modern teaching methodologies.',
      category: 'training',
      priority: 'medium',
      date: '2024-01-08',
      time: '11:45 AM',
      isPinned: false,
      author: 'HR Department'
    },
    {
      id: 5,
      title: 'Library Resource Update',
      content: 'New digital resources have been added to the library. Access credentials will be shared soon.',
      category: 'general',
      priority: 'low',
      date: '2024-01-05',
      time: '3:20 PM',
      isPinned: false,
      author: 'Library Department'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Notices', count: notices.length },
    { value: 'meeting', label: 'Meetings', count: notices.filter(n => n.category === 'meeting').length },
    { value: 'academic', label: 'Academic', count: notices.filter(n => n.category === 'academic').length },
    { value: 'general', label: 'General', count: notices.filter(n => n.category === 'general').length },
    { value: 'training', label: 'Training', count: notices.filter(n => n.category === 'training').length }
  ];

  const filteredNotices = selectedCategory === 'all' 
    ? notices 
    : notices.filter(notice => notice.category === selectedCategory);

  const sortedNotices = [...filteredNotices].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.date) - new Date(a.date);
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'meeting': return '👥';
      case 'academic': return '📚';
      case 'training': return '🎓';
      case 'general': return '📢';
      default: return '📋';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Bell size={20} className="text-gray-400 mr-2" />
          <h2 className="text-xl font-bold text-gray-900">Notice Board</h2>
        </div>
        <Filter size={16} className="text-gray-400" />
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.value
                  ? 'bg-blue-100 text-blue-800 border border-blue-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200'
              }`}
            >
              {category.label} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* Notices List */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {sortedNotices.length > 0 ? (
          sortedNotices.map((notice) => (
            <div
              key={notice.id}
              className={`p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer ${
                notice.isPinned ? 'border-blue-200 bg-blue-50' : 'border-gray-200 bg-white'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {notice.isPinned && (
                    <Pin size={14} className="text-blue-600 transform rotate-45" />
                  )}
                  <span className="text-lg">{getCategoryIcon(notice.category)}</span>
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                    {notice.title}
                  </h3>
                </div>
                <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
              </div>

              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {notice.content}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(notice.priority)}`}>
                    {notice.priority.charAt(0).toUpperCase() + notice.priority.slice(1)}
                  </span>
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar size={12} className="mr-1" />
                    {new Date(notice.date).toLocaleDateString()} at {notice.time}
                  </div>
                </div>
                <span className="text-xs text-gray-500">
                  {notice.author}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Bell size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No notices found for the selected category.</p>
          </div>
        )}
      </div>

      {/* View All Button */}
      {sortedNotices.length > 0 && (
        <div className="mt-4 text-center">
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
            View All Notices →
          </button>
        </div>
      )}
    </div>
  );
};

export default NoticeBoard;