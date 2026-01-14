import { useState } from 'react';
import { Filter, ChevronDown } from 'lucide-react';

const SubjectFilters = ({ onFilterChange }) => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');

  // Teacher's assigned subjects - this would come from API/user profile
  const teacherSubjects = ['physics', 'chemistry', 'english']; // Only subjects this teacher teaches

  // Sample data - in real app this would come from API
  const classes = [
    { id: '9', name: 'Class 9' },
    { id: '10', name: 'Class 10' },
    { id: '11', name: 'Class 11' },
    { id: '12', name: 'Class 12' }
  ];

  const sections = [
    { id: 'A', name: 'Section A' },
    { id: 'B', name: 'Section B' },
    { id: 'C', name: 'Section C' },
    { id: 'D', name: 'Section D' }
  ];

  // All available subjects by class
  const allSubjectsByClass = {
    '9': [
      { id: 'math', name: 'Mathematics' },
      { id: 'english', name: 'English' },
      { id: 'science', name: 'Science' },
      { id: 'social', name: 'Social Studies' }
    ],
    '10': [
      { id: 'math', name: 'Mathematics' },
      { id: 'english', name: 'English' },
      { id: 'science', name: 'Science' },
      { id: 'social', name: 'Social Studies' }
    ],
    '11': [
      { id: 'math', name: 'Mathematics' },
      { id: 'physics', name: 'Physics' },
      { id: 'chemistry', name: 'Chemistry' },
      { id: 'biology', name: 'Biology' },
      { id: 'english', name: 'English' }
    ],
    '12': [
      { id: 'math', name: 'Mathematics' },
      { id: 'physics', name: 'Physics' },
      { id: 'chemistry', name: 'Chemistry' },
      { id: 'biology', name: 'Biology' },
      { id: 'english', name: 'English' }
    ]
  };

  // Filter subjects to only show what the teacher teaches
  const getTeacherSubjectsForClass = (classId) => {
    if (!classId || !allSubjectsByClass[classId]) return [];
    
    return allSubjectsByClass[classId].filter(subject => 
      teacherSubjects.includes(subject.id)
    );
  };

  const handleClassChange = (classId) => {
    setSelectedClass(classId);
    setSelectedSection('');
    setSelectedSubject('');
    onFilterChange({ class: classId, section: '', subject: '' });
  };

  const handleSectionChange = (sectionId) => {
    setSelectedSection(sectionId);
    setSelectedSubject('');
    onFilterChange({ class: selectedClass, section: sectionId, subject: '' });
  };

  const handleSubjectChange = (subjectId) => {
    setSelectedSubject(subjectId);
    onFilterChange({ class: selectedClass, section: selectedSection, subject: subjectId });
  };

  const resetFilters = () => {
    setSelectedClass('');
    setSelectedSection('');
    setSelectedSubject('');
    onFilterChange({ class: '', section: '', subject: '' });
  };

  const availableSubjects = getTeacherSubjectsForClass(selectedClass);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Filter size={20} className="text-blue-600 mr-2" />
          <h2 className="text-xl font-bold text-gray-900">Filter Classes & Subjects</h2>
        </div>
        {(selectedClass || selectedSection || selectedSubject) && (
          <button
            onClick={resetFilters}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Class Filter - First */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Class
          </label>
          <div className="relative">
            <select
              value={selectedClass}
              onChange={(e) => handleClassChange(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none bg-white"
            >
              <option value="">Choose Class</option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </select>
            <ChevronDown size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Section Filter - Second */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Section
          </label>
          <div className="relative">
            <select
              value={selectedSection}
              onChange={(e) => handleSectionChange(e.target.value)}
              disabled={!selectedClass}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none ${
                !selectedClass ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
              }`}
            >
              <option value="">Choose Section</option>
              {selectedClass && sections.map((section) => (
                <option key={section.id} value={section.id}>
                  {section.name}
                </option>
              ))}
            </select>
            <ChevronDown size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Subject Filter - Third */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Subject
          </label>
          <div className="relative">
            <select
              value={selectedSubject}
              onChange={(e) => handleSubjectChange(e.target.value)}
              disabled={!selectedSection || availableSubjects.length === 0}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none ${
                !selectedSection || availableSubjects.length === 0 ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
              }`}
            >
              <option value="">
                {availableSubjects.length === 0 && selectedClass 
                  ? "No subjects assigned for this class" 
                  : "Choose Subject"
                }
              </option>
              {availableSubjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
            <ChevronDown size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          {selectedClass && availableSubjects.length === 0 && (
            <p className="text-sm text-amber-600 mt-2 flex items-center">
              <span className="w-4 h-4 bg-amber-100 rounded-full flex items-center justify-center mr-2">
                <span className="text-xs">!</span>
              </span>
              You don't teach any subjects in {classes.find(c => c.id === selectedClass)?.name}
            </p>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {(selectedClass || selectedSection || selectedSubject) && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center flex-wrap gap-2">
            <span className="text-sm font-medium text-blue-900">Active Filters:</span>
            {selectedClass && (
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                Class {selectedClass}
              </span>
            )}
            {selectedSection && (
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                Section {selectedSection}
              </span>
            )}
            {selectedSubject && (
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {availableSubjects.find(s => s.id === selectedSubject)?.name}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Teacher's Subjects Info */}
      <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
          <span className="text-sm font-medium text-green-900">Your Assigned Subjects:</span>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {teacherSubjects.map((subjectId) => {
            const subjectName = Object.values(allSubjectsByClass)
              .flat()
              .find(s => s.id === subjectId)?.name || subjectId;
            return (
              <span key={subjectId} className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                {subjectName}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SubjectFilters;