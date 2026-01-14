import { useState } from 'react';
import { BookOpen, Users, TrendingUp, Plus } from 'lucide-react';
import SubjectFilters from './SubjectFilters';
import SyllabusProgress from './SyllabusProgress';
import AllSubjectsOverview from './AllSubjectsOverview';
import QuickStats from './QuickStats';

const ClassSubjectsMain = () => {
  const [filters, setFilters] = useState({
    class: '',
    section: '',
    subject: ''
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Class & Subjects
            </h1>
            <p className="text-gray-600">
              Manage subjects, classes, and track syllabus completion across all your teaching assignments.
            </p>
          </div>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            <Plus size={16} className="mr-2" />
            Add New Subject
          </button>
        </div>
      </div>

      {/* Filters */}
      <SubjectFilters onFilterChange={handleFilterChange} />

      {/* Syllabus Progress - Only show when filters are selected */}
      {filters.class && filters.section && filters.subject && (
        <SyllabusProgress filters={filters} />
      )}

      {/* All Subjects Overview */}
      <AllSubjectsOverview />

      {/* Quick Stats */}
      <QuickStats />
    </div>
  );
};

export default ClassSubjectsMain;