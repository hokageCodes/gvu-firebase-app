import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { AiOutlineEye, AiOutlineDelete } from 'react-icons/ai'; // Importing React Icons

const ViewUploads = () => {
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredUploads, setFilteredUploads] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCollege, setSelectedCollege] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');

  const colleges = [
    "College Of Basic And Applied Sciences",
    "College Of Management And Social Sciences",
    "College Of Humanities",
    "College Of Law"
  ];

  const departments = {
    "College Of Basic And Applied Sciences": [
      "Mathematical And Physical Sciences (MPS)",
      "Chemical Sciences",
      "Biological Sciences"
    ],
    "College Of Management And Social Sciences": [
      "Mass Communication",
      "Accounting",
      "Economics",
      "Public Administration",
      "Business Administration"
    ],
    "College Of Humanities": [
      "History and Diplomatic Studies",
      "Languages",
      "Philosophy",
      "Religious Study",
      "French"
    ],
    "College Of Law": ["Law"]
  };

  const levels = ["100", "200", "300", "400"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'past-questions'));
        const uploadsData = [];
        querySnapshot.forEach((doc) => {
          uploadsData.push({
            id: doc.id,
            ...doc.data()
          });
        });
        setUploads(uploadsData);
        setFilteredUploads(uploadsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching uploads:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    filterUploads();
  }, [selectedCollege, selectedDepartment, selectedLevel, searchTerm]);

  const filterUploads = () => {
    let filtered = uploads;

    if (selectedCollege) {
      filtered = filtered.filter(upload => upload.college === selectedCollege);
    }

    if (selectedDepartment) {
      filtered = filtered.filter(upload => upload.department === selectedDepartment);
    }

    if (selectedLevel) {
      filtered = filtered.filter(upload => upload.level === selectedLevel);
    }

    if (searchTerm) {
      filtered = filtered.filter(upload =>
        upload.fileName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredUploads(filtered);
  };

  const handleCollegeChange = (e) => {
    setSelectedCollege(e.target.value);
    setSelectedDepartment('');
  };

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  const handleLevelChange = (e) => {
    setSelectedLevel(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleViewFile = (fileUrl) => {
    window.open(fileUrl, '_blank', 'noopener,noreferrer');
  };

  const handleDeleteFile = async (id) => {
    try {
      await deleteDoc(doc(db, 'past-questions', id));
      setUploads(uploads.filter(upload => upload.id !== id));
      setFilteredUploads(filteredUploads.filter(upload => upload.id !== id));
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div>
          <h2 className="text-2xl font-semibold leading-tight">View Uploads</h2>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
            <div className="flex flex-wrap items-center justify-between mb-4">
              <div className="w-full md:w-2/5 lg:w-1/4 mb-4 md:mb-0">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md"
                  placeholder="Search by file name"
                />
              </div>
              <div className="relative w-full md:w-2/5 lg:w-1/4 mb-4 md:mb-0">
                <select
                  value={selectedCollege}
                  onChange={handleCollegeChange}
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md"
                >
                  <option value="">All Colleges</option>
                  {colleges.map((college, index) => (
                    <option key={index} value={college}>{college}</option>
                  ))}
                </select>
              </div>
              {selectedCollege && (
                <div className="relative w-full md:w-2/5 lg:w-1/4 mb-4 md:mb-0">
                  <select
                    value={selectedDepartment}
                    onChange={handleDepartmentChange}
                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md"
                  >
                    <option value="">All Departments</option>
                    {departments[selectedCollege].map((department, index) => (
                      <option key={index} value={department}>{department}</option>
                    ))}
                  </select>
                </div>
              )}
              <div className="relative w-full md:w-1/5 lg:w-1/4 mb-4 md:mb-0">
                <select
                  value={selectedLevel}
                  onChange={handleLevelChange}
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md"
                >
                  <option value="">All Levels</option>
                  {levels.map((level, index) => (
                    <option key={index} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>

            {filteredUploads.length === 0 ? (
              <div>No data available.</div>
            ) : (
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">College</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Department</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Level</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">File Name</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUploads.map((upload) => (
                    <tr key={upload.id}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-normal">{upload.college}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-normal">{upload.department}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-normal">{upload.level}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-normal">{upload.fileName}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                        <AiOutlineEye
                          className="inline-block mr-2 text-blue-600 hover:text-blue-800 cursor-pointer"
                          onClick={() => handleViewFile(upload.fileUrl)}
                        />
                        <AiOutlineDelete
                          className="inline-block text-red-600 hover:text-red-800 cursor-pointer"
                          onClick={() => handleDeleteFile(upload.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUploads;
