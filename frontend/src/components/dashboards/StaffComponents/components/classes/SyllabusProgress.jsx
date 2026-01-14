import { useState } from 'react';
import { BookOpen, CheckCircle, Clock, AlertCircle, TrendingUp, XCircle } from 'lucide-react';

const SyllabusProgress = ({ filters }) => {
  // Teacher's assigned subjects - this would come from API/user profile
  const teacherSubjects = ['physics', 'chemistry', 'english'];

  // Sample syllabus data based on filters
  const getSyllabusData = () => {
    if (!filters.class || !filters.section || !filters.subject) {
      return null;
    }

    // Check if teacher teaches this subject
    if (!teacherSubjects.includes(filters.subject)) {
      return 'not-assigned';
    }

    // Comprehensive sample data - in real app this would come from API
    const syllabusData = {
      // Physics Data
      '11-A-physics': {
        subject: 'Physics',
        class: '11',
        section: 'A',
        totalChapters: 12,
        completedChapters: 7,
        chapters: [
          { id: 1, name: 'Physical World', status: 'completed', completionDate: '2024-01-08' },
          { id: 2, name: 'Units and Measurements', status: 'completed', completionDate: '2024-01-12' },
          { id: 3, name: 'Motion in a Straight Line', status: 'completed', completionDate: '2024-01-18' },
          { id: 4, name: 'Motion in a Plane', status: 'completed', completionDate: '2024-01-25' },
          { id: 5, name: 'Laws of Motion', status: 'completed', completionDate: '2024-02-02' },
          { id: 6, name: 'Work, Energy and Power', status: 'completed', completionDate: '2024-02-08' },
          { id: 7, name: 'System of Particles and Rotational Motion', status: 'completed', completionDate: '2024-02-15' },
          { id: 8, name: 'Gravitation', status: 'in-progress', estimatedCompletion: '2024-02-28' },
          { id: 9, name: 'Mechanical Properties of Solids', status: 'pending', estimatedCompletion: '2024-03-08' },
          { id: 10, name: 'Mechanical Properties of Fluids', status: 'pending', estimatedCompletion: '2024-03-15' },
          { id: 11, name: 'Thermal Properties of Matter', status: 'pending', estimatedCompletion: '2024-03-22' },
          { id: 12, name: 'Thermodynamics', status: 'pending', estimatedCompletion: '2024-03-30' }
        ]
      },
      '11-B-physics': {
        subject: 'Physics',
        class: '11',
        section: 'B',
        totalChapters: 12,
        completedChapters: 8,
        chapters: [
          { id: 1, name: 'Physical World', status: 'completed', completionDate: '2024-01-10' },
          { id: 2, name: 'Units and Measurements', status: 'completed', completionDate: '2024-01-15' },
          { id: 3, name: 'Motion in a Straight Line', status: 'completed', completionDate: '2024-01-20' },
          { id: 4, name: 'Motion in a Plane', status: 'completed', completionDate: '2024-01-28' },
          { id: 5, name: 'Laws of Motion', status: 'completed', completionDate: '2024-02-05' },
          { id: 6, name: 'Work, Energy and Power', status: 'completed', completionDate: '2024-02-10' },
          { id: 7, name: 'System of Particles and Rotational Motion', status: 'completed', completionDate: '2024-02-18' },
          { id: 8, name: 'Gravitation', status: 'completed', completionDate: '2024-02-25' },
          { id: 9, name: 'Mechanical Properties of Solids', status: 'in-progress', estimatedCompletion: '2024-03-05' },
          { id: 10, name: 'Mechanical Properties of Fluids', status: 'pending', estimatedCompletion: '2024-03-12' },
          { id: 11, name: 'Thermal Properties of Matter', status: 'pending', estimatedCompletion: '2024-03-20' },
          { id: 12, name: 'Thermodynamics', status: 'pending', estimatedCompletion: '2024-03-28' }
        ]
      },
      '11-C-physics': {
        subject: 'Physics',
        class: '11',
        section: 'C',
        totalChapters: 12,
        completedChapters: 6,
        chapters: [
          { id: 1, name: 'Physical World', status: 'completed', completionDate: '2024-01-12' },
          { id: 2, name: 'Units and Measurements', status: 'completed', completionDate: '2024-01-18' },
          { id: 3, name: 'Motion in a Straight Line', status: 'completed', completionDate: '2024-01-25' },
          { id: 4, name: 'Motion in a Plane', status: 'completed', completionDate: '2024-02-02' },
          { id: 5, name: 'Laws of Motion', status: 'completed', completionDate: '2024-02-08' },
          { id: 6, name: 'Work, Energy and Power', status: 'completed', completionDate: '2024-02-15' },
          { id: 7, name: 'System of Particles and Rotational Motion', status: 'in-progress', estimatedCompletion: '2024-03-01' },
          { id: 8, name: 'Gravitation', status: 'pending', estimatedCompletion: '2024-03-08' },
          { id: 9, name: 'Mechanical Properties of Solids', status: 'pending', estimatedCompletion: '2024-03-15' },
          { id: 10, name: 'Mechanical Properties of Fluids', status: 'pending', estimatedCompletion: '2024-03-22' },
          { id: 11, name: 'Thermal Properties of Matter', status: 'pending', estimatedCompletion: '2024-03-30' },
          { id: 12, name: 'Thermodynamics', status: 'pending', estimatedCompletion: '2024-04-05' }
        ]
      },
      '12-A-physics': {
        subject: 'Physics',
        class: '12',
        section: 'A',
        totalChapters: 10,
        completedChapters: 9,
        chapters: [
          { id: 1, name: 'Electric Charges and Fields', status: 'completed', completionDate: '2024-01-05' },
          { id: 2, name: 'Electrostatic Potential and Capacitance', status: 'completed', completionDate: '2024-01-12' },
          { id: 3, name: 'Current Electricity', status: 'completed', completionDate: '2024-01-20' },
          { id: 4, name: 'Moving Charges and Magnetism', status: 'completed', completionDate: '2024-01-28' },
          { id: 5, name: 'Magnetism and Matter', status: 'completed', completionDate: '2024-02-05' },
          { id: 6, name: 'Electromagnetic Induction', status: 'completed', completionDate: '2024-02-12' },
          { id: 7, name: 'Alternating Current', status: 'completed', completionDate: '2024-02-20' },
          { id: 8, name: 'Electromagnetic Waves', status: 'completed', completionDate: '2024-02-25' },
          { id: 9, name: 'Ray Optics and Optical Instruments', status: 'completed', completionDate: '2024-03-01' },
          { id: 10, name: 'Wave Optics', status: 'in-progress', estimatedCompletion: '2024-03-10' }
        ]
      },
      '12-B-physics': {
        subject: 'Physics',
        class: '12',
        section: 'B',
        totalChapters: 10,
        completedChapters: 8,
        chapters: [
          { id: 1, name: 'Electric Charges and Fields', status: 'completed', completionDate: '2024-01-08' },
          { id: 2, name: 'Electrostatic Potential and Capacitance', status: 'completed', completionDate: '2024-01-15' },
          { id: 3, name: 'Current Electricity', status: 'completed', completionDate: '2024-01-22' },
          { id: 4, name: 'Moving Charges and Magnetism', status: 'completed', completionDate: '2024-02-01' },
          { id: 5, name: 'Magnetism and Matter', status: 'completed', completionDate: '2024-02-08' },
          { id: 6, name: 'Electromagnetic Induction', status: 'completed', completionDate: '2024-02-15' },
          { id: 7, name: 'Alternating Current', status: 'completed', completionDate: '2024-02-22' },
          { id: 8, name: 'Electromagnetic Waves', status: 'completed', completionDate: '2024-02-28' },
          { id: 9, name: 'Ray Optics and Optical Instruments', status: 'in-progress', estimatedCompletion: '2024-03-08' },
          { id: 10, name: 'Wave Optics', status: 'pending', estimatedCompletion: '2024-03-15' }
        ]
      },

      // Chemistry Data
      '11-A-chemistry': {
        subject: 'Chemistry',
        class: '11',
        section: 'A',
        totalChapters: 14,
        completedChapters: 9,
        chapters: [
          { id: 1, name: 'Some Basic Concepts of Chemistry', status: 'completed', completionDate: '2024-01-05' },
          { id: 2, name: 'Structure of Atom', status: 'completed', completionDate: '2024-01-12' },
          { id: 3, name: 'Classification of Elements and Periodicity', status: 'completed', completionDate: '2024-01-20' },
          { id: 4, name: 'Chemical Bonding and Molecular Structure', status: 'completed', completionDate: '2024-01-28' },
          { id: 5, name: 'States of Matter', status: 'completed', completionDate: '2024-02-05' },
          { id: 6, name: 'Thermodynamics', status: 'completed', completionDate: '2024-02-12' },
          { id: 7, name: 'Equilibrium', status: 'completed', completionDate: '2024-02-20' },
          { id: 8, name: 'Redox Reactions', status: 'completed', completionDate: '2024-02-25' },
          { id: 9, name: 'Hydrogen', status: 'completed', completionDate: '2024-03-01' },
          { id: 10, name: 'The s-Block Elements', status: 'in-progress', estimatedCompletion: '2024-03-10' },
          { id: 11, name: 'The p-Block Elements', status: 'pending', estimatedCompletion: '2024-03-18' },
          { id: 12, name: 'Organic Chemistry - Some Basic Principles', status: 'pending', estimatedCompletion: '2024-03-25' },
          { id: 13, name: 'Hydrocarbons', status: 'pending', estimatedCompletion: '2024-04-01' },
          { id: 14, name: 'Environmental Chemistry', status: 'pending', estimatedCompletion: '2024-04-08' }
        ]
      },
      '11-B-chemistry': {
        subject: 'Chemistry',
        class: '11',
        section: 'B',
        totalChapters: 14,
        completedChapters: 11,
        chapters: [
          { id: 1, name: 'Some Basic Concepts of Chemistry', status: 'completed', completionDate: '2024-01-08' },
          { id: 2, name: 'Structure of Atom', status: 'completed', completionDate: '2024-01-15' },
          { id: 3, name: 'Classification of Elements and Periodicity', status: 'completed', completionDate: '2024-01-22' },
          { id: 4, name: 'Chemical Bonding and Molecular Structure', status: 'completed', completionDate: '2024-02-01' },
          { id: 5, name: 'States of Matter', status: 'completed', completionDate: '2024-02-08' },
          { id: 6, name: 'Thermodynamics', status: 'completed', completionDate: '2024-02-15' },
          { id: 7, name: 'Equilibrium', status: 'completed', completionDate: '2024-02-22' },
          { id: 8, name: 'Redox Reactions', status: 'completed', completionDate: '2024-02-28' },
          { id: 9, name: 'Hydrogen', status: 'completed', completionDate: '2024-03-05' },
          { id: 10, name: 'The s-Block Elements', status: 'completed', completionDate: '2024-03-12' },
          { id: 11, name: 'The p-Block Elements', status: 'completed', completionDate: '2024-03-18' },
          { id: 12, name: 'Organic Chemistry - Some Basic Principles', status: 'in-progress', estimatedCompletion: '2024-03-25' },
          { id: 13, name: 'Hydrocarbons', status: 'pending', estimatedCompletion: '2024-04-01' },
          { id: 14, name: 'Environmental Chemistry', status: 'pending', estimatedCompletion: '2024-04-08' }
        ]
      },
      '12-A-chemistry': {
        subject: 'Chemistry',
        class: '12',
        section: 'A',
        totalChapters: 16,
        completedChapters: 12,
        chapters: [
          { id: 1, name: 'The Solid State', status: 'completed', completionDate: '2024-01-05' },
          { id: 2, name: 'Solutions', status: 'completed', completionDate: '2024-01-10' },
          { id: 3, name: 'Electrochemistry', status: 'completed', completionDate: '2024-01-15' },
          { id: 4, name: 'Chemical Kinetics', status: 'completed', completionDate: '2024-01-20' },
          { id: 5, name: 'Surface Chemistry', status: 'completed', completionDate: '2024-01-25' },
          { id: 6, name: 'General Principles and Processes of Isolation of Elements', status: 'completed', completionDate: '2024-02-01' },
          { id: 7, name: 'The p-Block Elements', status: 'completed', completionDate: '2024-02-05' },
          { id: 8, name: 'The d-and f-Block Elements', status: 'completed', completionDate: '2024-02-10' },
          { id: 9, name: 'Coordination Compounds', status: 'completed', completionDate: '2024-02-15' },
          { id: 10, name: 'Haloalkanes and Haloarenes', status: 'completed', completionDate: '2024-02-20' },
          { id: 11, name: 'Alcohols, Phenols and Ethers', status: 'completed', completionDate: '2024-02-25' },
          { id: 12, name: 'Aldehydes, Ketones and Carboxylic Acids', status: 'completed', completionDate: '2024-03-01' },
          { id: 13, name: 'Amines', status: 'in-progress', estimatedCompletion: '2024-03-10' },
          { id: 14, name: 'Biomolecules', status: 'pending', estimatedCompletion: '2024-03-15' },
          { id: 15, name: 'Polymers', status: 'pending', estimatedCompletion: '2024-03-20' },
          { id: 16, name: 'Chemistry in Everyday Life', status: 'pending', estimatedCompletion: '2024-03-25' }
        ]
      },
      '12-B-chemistry': {
        subject: 'Chemistry',
        class: '12',
        section: 'B',
        totalChapters: 16,
        completedChapters: 10,
        chapters: [
          { id: 1, name: 'The Solid State', status: 'completed', completionDate: '2024-01-05' },
          { id: 2, name: 'Solutions', status: 'completed', completionDate: '2024-01-10' },
          { id: 3, name: 'Electrochemistry', status: 'completed', completionDate: '2024-01-15' },
          { id: 4, name: 'Chemical Kinetics', status: 'completed', completionDate: '2024-01-20' },
          { id: 5, name: 'Surface Chemistry', status: 'completed', completionDate: '2024-01-25' },
          { id: 6, name: 'General Principles and Processes of Isolation of Elements', status: 'completed', completionDate: '2024-02-01' },
          { id: 7, name: 'The p-Block Elements', status: 'completed', completionDate: '2024-02-05' },
          { id: 8, name: 'The d-and f-Block Elements', status: 'completed', completionDate: '2024-02-10' },
          { id: 9, name: 'Coordination Compounds', status: 'completed', completionDate: '2024-02-15' },
          { id: 10, name: 'Haloalkanes and Haloarenes', status: 'completed', completionDate: '2024-02-20' },
          { id: 11, name: 'Alcohols, Phenols and Ethers', status: 'in-progress', estimatedCompletion: '2024-03-01' },
          { id: 12, name: 'Aldehydes, Ketones and Carboxylic Acids', status: 'pending', estimatedCompletion: '2024-03-10' },
          { id: 13, name: 'Amines', status: 'pending', estimatedCompletion: '2024-03-15' },
          { id: 14, name: 'Biomolecules', status: 'pending', estimatedCompletion: '2024-03-20' },
          { id: 15, name: 'Polymers', status: 'pending', estimatedCompletion: '2024-03-25' },
          { id: 16, name: 'Chemistry in Everyday Life', status: 'pending', estimatedCompletion: '2024-03-30' }
        ]
      },
      '12-C-chemistry': {
        subject: 'Chemistry',
        class: '12',
        section: 'C',
        totalChapters: 16,
        completedChapters: 14,
        chapters: [
          { id: 1, name: 'The Solid State', status: 'completed', completionDate: '2024-01-03' },
          { id: 2, name: 'Solutions', status: 'completed', completionDate: '2024-01-08' },
          { id: 3, name: 'Electrochemistry', status: 'completed', completionDate: '2024-01-12' },
          { id: 4, name: 'Chemical Kinetics', status: 'completed', completionDate: '2024-01-18' },
          { id: 5, name: 'Surface Chemistry', status: 'completed', completionDate: '2024-01-22' },
          { id: 6, name: 'General Principles and Processes of Isolation of Elements', status: 'completed', completionDate: '2024-01-28' },
          { id: 7, name: 'The p-Block Elements', status: 'completed', completionDate: '2024-02-02' },
          { id: 8, name: 'The d-and f-Block Elements', status: 'completed', completionDate: '2024-02-08' },
          { id: 9, name: 'Coordination Compounds', status: 'completed', completionDate: '2024-02-12' },
          { id: 10, name: 'Haloalkanes and Haloarenes', status: 'completed', completionDate: '2024-02-18' },
          { id: 11, name: 'Alcohols, Phenols and Ethers', status: 'completed', completionDate: '2024-02-22' },
          { id: 12, name: 'Aldehydes, Ketones and Carboxylic Acids', status: 'completed', completionDate: '2024-02-28' },
          { id: 13, name: 'Amines', status: 'completed', completionDate: '2024-03-05' },
          { id: 14, name: 'Biomolecules', status: 'completed', completionDate: '2024-03-10' },
          { id: 15, name: 'Polymers', status: 'in-progress', estimatedCompletion: '2024-03-18' },
          { id: 16, name: 'Chemistry in Everyday Life', status: 'pending', estimatedCompletion: '2024-03-25' }
        ]
      },

      // English Data
      '9-A-english': {
        subject: 'English',
        class: '9',
        section: 'A',
        totalChapters: 10,
        completedChapters: 5,
        chapters: [
          { id: 1, name: 'The Fun They Had', status: 'completed', completionDate: '2024-01-10' },
          { id: 2, name: 'The Sound of Music', status: 'completed', completionDate: '2024-01-15' },
          { id: 3, name: 'The Little Girl', status: 'completed', completionDate: '2024-01-20' },
          { id: 4, name: 'A Truly Beautiful Mind', status: 'completed', completionDate: '2024-01-25' },
          { id: 5, name: 'The Snake and the Mirror', status: 'completed', completionDate: '2024-02-01' },
          { id: 6, name: 'My Childhood', status: 'in-progress', estimatedCompletion: '2024-02-28' },
          { id: 7, name: 'Reach for the Top', status: 'pending', estimatedCompletion: '2024-03-08' },
          { id: 8, name: 'Kathmandu', status: 'pending', estimatedCompletion: '2024-03-15' },
          { id: 9, name: 'If I Were You', status: 'pending', estimatedCompletion: '2024-03-22' },
          { id: 10, name: 'The Happy Prince', status: 'pending', estimatedCompletion: '2024-03-30' }
        ]
      },
      '9-B-english': {
        subject: 'English',
        class: '9',
        section: 'B',
        totalChapters: 10,
        completedChapters: 6,
        chapters: [
          { id: 1, name: 'The Fun They Had', status: 'completed', completionDate: '2024-01-12' },
          { id: 2, name: 'The Sound of Music', status: 'completed', completionDate: '2024-01-18' },
          { id: 3, name: 'The Little Girl', status: 'completed', completionDate: '2024-01-25' },
          { id: 4, name: 'A Truly Beautiful Mind', status: 'completed', completionDate: '2024-02-01' },
          { id: 5, name: 'The Snake and the Mirror', status: 'completed', completionDate: '2024-02-08' },
          { id: 6, name: 'My Childhood', status: 'completed', completionDate: '2024-02-15' },
          { id: 7, name: 'Reach for the Top', status: 'in-progress', estimatedCompletion: '2024-03-01' },
          { id: 8, name: 'Kathmandu', status: 'pending', estimatedCompletion: '2024-03-10' },
          { id: 9, name: 'If I Were You', status: 'pending', estimatedCompletion: '2024-03-18' },
          { id: 10, name: 'The Happy Prince', status: 'pending', estimatedCompletion: '2024-03-25' }
        ]
      },
      '10-A-english': {
        subject: 'English',
        class: '10',
        section: 'A',
        totalChapters: 10,
        completedChapters: 7,
        chapters: [
          { id: 1, name: 'A Letter to God', status: 'completed', completionDate: '2024-01-10' },
          { id: 2, name: 'Nelson Mandela: Long Walk to Freedom', status: 'completed', completionDate: '2024-01-15' },
          { id: 3, name: 'Two Stories about Flying', status: 'completed', completionDate: '2024-01-20' },
          { id: 4, name: 'From the Diary of Anne Frank', status: 'completed', completionDate: '2024-01-25' },
          { id: 5, name: 'The Hundred Dresses', status: 'completed', completionDate: '2024-02-01' },
          { id: 6, name: 'Glimpses of India', status: 'completed', completionDate: '2024-02-05' },
          { id: 7, name: 'Mijbil the Otter', status: 'completed', completionDate: '2024-02-12' },
          { id: 8, name: 'Madam Rides the Bus', status: 'in-progress', estimatedCompletion: '2024-02-28' },
          { id: 9, name: 'The Sermon at Benares', status: 'pending', estimatedCompletion: '2024-03-08' },
          { id: 10, name: 'The Proposal', status: 'pending', estimatedCompletion: '2024-03-15' }
        ]
      },
      '10-B-english': {
        subject: 'English',
        class: '10',
        section: 'B',
        totalChapters: 10,
        completedChapters: 8,
        chapters: [
          { id: 1, name: 'A Letter to God', status: 'completed', completionDate: '2024-01-08' },
          { id: 2, name: 'Nelson Mandela: Long Walk to Freedom', status: 'completed', completionDate: '2024-01-12' },
          { id: 3, name: 'Two Stories about Flying', status: 'completed', completionDate: '2024-01-18' },
          { id: 4, name: 'From the Diary of Anne Frank', status: 'completed', completionDate: '2024-01-22' },
          { id: 5, name: 'The Hundred Dresses', status: 'completed', completionDate: '2024-01-28' },
          { id: 6, name: 'Glimpses of India', status: 'completed', completionDate: '2024-02-02' },
          { id: 7, name: 'Mijbil the Otter', status: 'completed', completionDate: '2024-02-08' },
          { id: 8, name: 'Madam Rides the Bus', status: 'completed', completionDate: '2024-02-15' },
          { id: 9, name: 'The Sermon at Benares', status: 'in-progress', estimatedCompletion: '2024-03-01' },
          { id: 10, name: 'The Proposal', status: 'pending', estimatedCompletion: '2024-03-10' }
        ]
      },
      '10-C-english': {
        subject: 'English',
        class: '10',
        section: 'C',
        totalChapters: 10,
        completedChapters: 6,
        chapters: [
          { id: 1, name: 'A Letter to God', status: 'completed', completionDate: '2024-01-10' },
          { id: 2, name: 'Nelson Mandela: Long Walk to Freedom', status: 'completed', completionDate: '2024-01-15' },
          { id: 3, name: 'Two Stories about Flying', status: 'completed', completionDate: '2024-01-20' },
          { id: 4, name: 'From the Diary of Anne Frank', status: 'completed', completionDate: '2024-01-25' },
          { id: 5, name: 'The Hundred Dresses', status: 'completed', completionDate: '2024-02-01' },
          { id: 6, name: 'Glimpses of India', status: 'completed', completionDate: '2024-02-05' },
          { id: 7, name: 'Mijbil the Otter', status: 'in-progress', estimatedCompletion: '2024-02-28' },
          { id: 8, name: 'Madam Rides the Bus', status: 'pending', estimatedCompletion: '2024-03-08' },
          { id: 9, name: 'The Sermon at Benares', status: 'pending', estimatedCompletion: '2024-03-15' },
          { id: 10, name: 'The Proposal', status: 'pending', estimatedCompletion: '2024-03-22' }
        ]
      }
    };

    const key = `${filters.class}-${filters.section}-${filters.subject}`;
    return syllabusData[key] || 'no-data';
  };

  const syllabusData = getSyllabusData();

  // Show selection prompt
  if (!syllabusData) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="text-center">
          <BookOpen size={48} className="text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Select Filters</h3>
          <p className="text-gray-600">
            Please select a class, section, and subject to view the syllabus progress.
          </p>
        </div>
      </div>
    );
  }

  // Show not assigned message
  if (syllabusData === 'not-assigned') {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="text-center">
          <XCircle size={48} className="text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Subject Not Assigned</h3>
          <p className="text-gray-600 mb-4">
            You are not assigned to teach <span className="font-semibold capitalize">{filters.subject}</span> for Class {filters.class} Section {filters.section}.
          </p>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-700">
              <strong>Your assigned subjects:</strong> Physics, Chemistry, English
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show no data message
  if (syllabusData === 'no-data') {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="text-center">
          <AlertCircle size={48} className="text-yellow-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Data Available</h3>
          <p className="text-gray-600 mb-4">
            No syllabus data found for <span className="font-semibold capitalize">{filters.subject}</span> - Class {filters.class} Section {filters.section}.
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-700">
              This might be because the syllabus hasn't been set up yet or you don't teach this particular class-section combination.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const completionPercentage = Math.round((syllabusData.completedChapters / syllabusData.totalChapters) * 100);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={20} className="text-green-600" />;
      case 'in-progress':
        return <Clock size={20} className="text-yellow-600" />;
      case 'pending':
        return <AlertCircle size={20} className="text-gray-400" />;
      default:
        return <AlertCircle size={20} className="text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 border-green-200';
      case 'in-progress':
        return 'bg-yellow-50 border-yellow-200';
      case 'pending':
        return 'bg-gray-50 border-gray-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      case 'pending':
        return 'Pending';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Syllabus Progress</h2>
            <p className="text-gray-600">
              {syllabusData.subject} - Class {syllabusData.class} Section {syllabusData.section}
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600">{completionPercentage}%</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{syllabusData.completedChapters} of {syllabusData.totalChapters} chapters</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
            <CheckCircle size={24} className="text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">{syllabusData.completedChapters}</div>
            <div className="text-sm text-green-700">Completed</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <Clock size={24} className="text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-yellow-600">
              {syllabusData.chapters.filter(ch => ch.status === 'in-progress').length}
            </div>
            <div className="text-sm text-yellow-700">In Progress</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
            <AlertCircle size={24} className="text-gray-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-600">
              {syllabusData.chapters.filter(ch => ch.status === 'pending').length}
            </div>
            <div className="text-sm text-gray-700">Pending</div>
          </div>
        </div>
      </div>

      {/* Chapter List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Chapter Details</h3>
        <div className="space-y-3">
          {syllabusData.chapters.map((chapter) => (
            <div
              key={chapter.id}
              className={`p-4 rounded-lg border transition-all hover:shadow-sm ${getStatusColor(chapter.status)}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(chapter.status)}
                  <div>
                    <h4 className="font-semibold text-gray-900">{chapter.name}</h4>
                    <p className="text-sm text-gray-600">
                      {chapter.status === 'completed' && chapter.completionDate && (
                        `Completed on ${new Date(chapter.completionDate).toLocaleDateString()}`
                      )}
                      {chapter.status === 'in-progress' && chapter.estimatedCompletion && (
                        `Expected completion: ${new Date(chapter.estimatedCompletion).toLocaleDateString()}`
                      )}
                      {chapter.status === 'pending' && chapter.estimatedCompletion && (
                        `Scheduled for: ${new Date(chapter.estimatedCompletion).toLocaleDateString()}`
                      )}
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  chapter.status === 'completed' ? 'bg-green-100 text-green-800' :
                  chapter.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {getStatusText(chapter.status)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SyllabusProgress;