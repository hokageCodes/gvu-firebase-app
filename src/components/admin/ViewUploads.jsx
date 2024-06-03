import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { AiOutlineEye, AiOutlineDelete } from 'react-icons/ai';

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
        console.error('Error fetching data from Firestore:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = uploads.filter(upload => 
      upload.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCollege ? upload.college === selectedCollege : true) &&
      (selectedDepartment ? upload.department === selectedDepartment : true) &&
      (selectedLevel ? upload.level === selectedLevel : true)
    );
    setFilteredUploads(filtered);
  }, [searchTerm, selectedCollege, selectedDepartment, selectedLevel, uploads]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'past-questions', id));
      setUploads(uploads.filter(upload => upload.id !== id));
      setFilteredUploads(filteredUploads.filter(upload => upload.id !== id));
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">View Uploads</h1>
      <div className="mb-4 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
        <input
          type="text"
          placeholder="Search by Course Code"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <select
          value={selectedCollege}
          onChange={(e) => setSelectedCollege(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Filter by College</option>
          {colleges.map((college, index) => (
            <option key={index} value={college}>{college}</option>
          ))}
        </select>
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Filter by Department</option>
          {selectedCollege && departments[selectedCollege].map((department, index) => (
            <option key={index} value={department}>{department}</option>
          ))}
        </select>
        <select
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Filter by Level</option>
          {levels.map((level, index) => (
            <option key={index} value={level}>{level}</option>
          ))}
        </select>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Course Code</th>
              <th className="py-2 px-4 border-b">College</th>
              <th className="py-2 px-4 border-b">Department</th>
              <th className="py-2 px-4 border-b">Level</th>
              <th className="py-2 px-4 border-b">Year</th>
              <th className="py-2 px-4 border-b">Semester</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUploads.map((upload) => (
              <tr key={upload.id}>
                <td className="py-2 px-4 border-b">{upload.courseCode}</td>
                <td className="py-2 px-4 border-b">{upload.college}</td>
                <td className="py-2 px-4 border-b">{upload.department}</td>
                <td className="py-2 px-4 border-b">{upload.level}</td>
                <td className="py-2 px-4 border-b">{upload.year}</td>
                <td className="py-2 px-4 border-b">{upload.semester}</td>
                <td className="py-2 px-4 border-b flex space-x-2">
                  <a
                    href={upload.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    <AiOutlineEye size={20} />
                  </a>
                  <button
                    onClick={() => handleDelete(upload.id)}
                    className="text-red-500"
                  >
                    <AiOutlineDelete size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewUploads;
