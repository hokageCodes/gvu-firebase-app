import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const AdminDashboard = () => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalColleges, setTotalColleges] = useState(0);
  const [totalDepartments, setTotalDepartments] = useState(0);

  useEffect(() => {
    const fetchTotalStudents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const totalStudentsCount = querySnapshot.size;
        setTotalStudents(totalStudentsCount);
      } catch (error) {
        console.error('Error fetching total number of students:', error);
      }
    };

    const totalCollegesCount = faculties.length;
    const totalDepartmentsCount = faculties.reduce(
      (acc, faculty) => acc + faculty.departments.length,
      0
    );

    setTotalColleges(totalCollegesCount);
    setTotalDepartments(totalDepartmentsCount);

    fetchTotalStudents();
  }, []);

  const faculties = [
    {
      name: 'College Of Basic And Applied Sciences',
      departments: [
        {
          name: 'Mathematical And Physical Sciences (MPS)',
          levels: ['100', '200', '300', '400', '500'],
        },
        {
          name: 'Chemical Sciences',
          levels: ['100', '200', '300', '400'],
        },
        {
          name: 'Biological Sciences',
          levels: ['100', '200', '300', '400'],
        },
      ],
    },
    {
      name: 'College Of Management And Social Sciences',
      departments: [
        {
          name: 'Mass Communication',
          levels: ['100', '200', '300', '400', '500'],
        },
        {
          name: 'Accounting',
          levels: ['100', '200', '300', '400', '500'],
        },
        {
          name: 'Economics',
          levels: ['100', '200', '300', '400', '500'],
        },
        {
          name: 'Public Administration',
          levels: ['100', '200', '300', '400', '500'],
        },
        {
          name: 'Business Administration',
          levels: ['100', '200', '300', '400', '500'],
        },
      ],
    },
    {
      name: 'College Of Humanities',
      departments: [
        {
          name: 'Mass Communication',
          levels: ['100', '200', '300', '400', '500'],
        },
        {
          name: 'Accounting',
          levels: ['100', '200', '300', '400', '500'],
        },
        {
          name: 'Economics',
          levels: ['100', '200', '300', '400', '500'],
        },
        {
          name: 'Public Administration',
          levels: ['100', '200', '300', '400', '500'],
        },
        {
          name: 'Business Administration',
          levels: ['100', '200', '300', '400', '500'],
        },
      ],
    },
    {
      name: 'College Of Law',
      departments: [
        {
          name: 'Law',
          levels: ['100', '200', '300', '400', '500'],
        },
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4">Dashboard Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h2 className="text-md sm:text-lg font-semibold mb-2">Total Number of Students</h2>
          <p className="text-2xl sm:text-3xl lg:text-4xl font-bold">{totalStudents}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h2 className="text-md sm:text-lg font-semibold mb-2">Total Number of Colleges</h2>
          <p className="text-2xl sm:text-3xl lg:text-4xl font-bold">{totalColleges}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h2 className="text-md sm:text-lg font-semibold mb-2">Total Number of Departments</h2>
          <p className="text-2xl sm:text-3xl lg:text-4xl font-bold">{totalDepartments}</p>
        </div>
      </div>
      {/* Add Recent Activities and Uploads Summary components here */}
    </div>
  );
};

export default AdminDashboard;
