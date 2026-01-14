import { useState } from 'react';
import { BookOpen, Users, TrendingUp, ChevronRight } from 'lucide-react';

const AllSubjectsOverview = () => {
  // Teacher's assigned subjects - only show subjects they actually teach
  const subjects = [
    {
      id: 2,
      name: 'Physics',
      classes: [
        {
          id: '11',
          name: 'Class 11',
          sections: ['A', 'B', 'C'],
          syllabusProgress: 65,
          totalTopics: 12,
          completedTopics: 8
        },
        {
          id: '12',
          name: 'Class 12',
          sections: ['A', 'B'],
          syllabusProgress: 90,
          totalTopics: 10,
          completedTopics: 9
        }
      ]
    },
    {
      id: 3,
      name: 'Chemistry',
      classes: [
        {
          id: '11',
          name: 'Class 11',
          sections: ['A', 'B'],
          syllabusProgress: 78,
          totalTopics: 14,
          completedTopics: 11
        },
        {
          id: '12',
          name: 'Class 12',
          sections: ['A', 'B', 'C'],
          syllabusProgress: 85,
          totalTopics: 16,
          completedTopics: 14
        }
      ]
    },
    {
      id: 4,
      name: 'English',
      classes: [
        {
          id: '9',
          name: 'Class 9',
          sections: ['A', 'B'],
          syllabusProgress: 55,
          totalTopics: 10,
          completedTopics: 5
        },
        {
          id: '10',
          name: 'Class 10',
          sections: ['A', 'B', 'C'],
          syllabusProgress: 72,
          totalTopics: 10,
          completedTopics: 7
        }
      ]
    }
  ];

  const ProgressBar = ({ progress, total, completed }) => (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Progress</span>
        <span className="text-gray-900 font-medium">
          {completed}/{total} topics ({progress}%)
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500" 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );

  const getBadgeVariant = (progress) => {
    if (progress >= 80) return 'bg-green-100 text-green-800 border-green-200';
    if (progress >= 60) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Your Teaching Assignments</h2>
          <div className="text-sm text-gray-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            {subjects.length} subjects assigned
          </div>
        </div>
        
        <div className="space-y-6">
          {subjects.map((subject) => (
            <div key={subject.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {subject.name}
                    </h3>
                    <p className="text-gray-600">
                      {subject.classes.length} classes assigned
                    </p>
                  </div>
                </div>
                <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                  View Details
                  <ChevronRight size={16} className="ml-2" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {subject.classes.map((classItem) => (
                  <div
                    key={classItem.id}
                    className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">
                        {classItem.name}
                      </h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getBadgeVariant(classItem.syllabusProgress)}`}>
                        {classItem.syllabusProgress}%
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          Sections: {classItem.sections.join(', ')}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {classItem.completedTopics}/{classItem.totalTopics} topics completed
                        </span>
                      </div>
                      
                      <ProgressBar 
                        progress={classItem.syllabusProgress}
                        total={classItem.totalTopics}
                        completed={classItem.completedTopics}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Note about assignments */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-700">
            <strong>Note:</strong> Only subjects assigned to you are displayed. If you need access to additional subjects, please contact the administration.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AllSubjectsOverview;