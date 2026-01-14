import { BookOpen, Users, TrendingUp } from 'lucide-react';

const QuickStats = () => {
  // Only teacher's assigned subjects - Physics, Chemistry, English
  const subjects = [
    {
      id: 2,
      name: 'Physics',
      classes: [
        { syllabusProgress: 65 },
        { syllabusProgress: 90 }
      ]
    },
    {
      id: 3,
      name: 'Chemistry',
      classes: [
        { syllabusProgress: 78 },
        { syllabusProgress: 85 }
      ]
    },
    {
      id: 4,
      name: 'English',
      classes: [
        { syllabusProgress: 55 },
        { syllabusProgress: 72 }
      ]
    }
  ];

  const totalSubjects = subjects.length;
  const totalClasses = subjects.reduce((total, subject) => total + subject.classes.length, 0);
  const averageCompletion = Math.round(
    subjects.reduce((total, subject) => 
      total + subject.classes.reduce((classTotal, cls) => classTotal + cls.syllabusProgress, 0), 0
    ) / subjects.reduce((total, subject) => total + subject.classes.length, 0)
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <BookOpen className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-2">
          {totalSubjects}
        </h3>
        <p className="text-gray-600 font-medium">Subjects Teaching</p>
        <p className="text-xs text-gray-500 mt-1">Physics, Chemistry, English</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="w-8 h-8 text-purple-600" />
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-2">
          {totalClasses}
        </h3>
        <p className="text-gray-600 font-medium">Total Classes</p>
        <p className="text-xs text-gray-500 mt-1">Across all assigned subjects</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <TrendingUp className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-2">
          {averageCompletion}%
        </h3>
        <p className="text-gray-600 font-medium">Avg. Completion</p>
        <p className="text-xs text-gray-500 mt-1">Overall syllabus progress</p>
      </div>
    </div>
  );
};

export default QuickStats;