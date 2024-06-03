import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';

const UploadPastQuestions = () => {
  const { currentUser } = useAuth();

  const initialFormData = {
    college: '',
    department: '',
    level: '',
    year: '',
    semester: '',
    courseCode: '',
    fileUrl: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [uploadError, setUploadError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(null);

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

  const levels = ["100", "200", "300", "400", "500"];
  const semesters = ["1st", "2nd"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setFormData({ ...formData, fileUrl: fileReader.result });
      };
      fileReader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fileUrl) {
      setUploadError('Please upload a file.');
      return;
    }

    if (!currentUser) {
      setUploadError('User is not authenticated.');
      return;
    }

    setUploadError(null);
    setUploadSuccess(null);

    try {
      await addDoc(collection(db, 'past-questions'), {
        college: formData.college,
        department: formData.department,
        level: formData.level,
        year: formData.year,
        semester: formData.semester,
        courseCode: formData.courseCode,
        fileUrl: formData.fileUrl,
        uploadedBy: currentUser.uid,
        uploadedAt: new Date()
      });

      setUploadSuccess('File uploaded successfully.');
      setFormData(initialFormData);
    } catch (error) {
      console.error('Error adding data to Firestore:', error);
      setUploadError(`Error adding data to Firestore: ${error.message}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Past Questions</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {uploadError && <p className="text-red-500">{uploadError}</p>}
        {uploadSuccess && <p className="text-green-500">{uploadSuccess}</p>}
        <div>
          <label className="block text-gray-700">College</label>
          <select
            name="college"
            value={formData.college}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select College</option>
            {colleges.map((college, index) => (
              <option key={index} value={college}>{college}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Department</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select Department</option>
            {formData.college && departments[formData.college].map((department, index) => (
              <option key={index} value={department}>{department}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Level</label>
          <select
            name="level"
            value={formData.level}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select Level</option>
            {levels.map((level, index) => (
              <option key={index} value={level}>{level}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Year</label>
          <input
            type="text"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Semester</label>
          <select
            name="semester"
            value={formData.semester}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select Semester</option>
            {semesters.map((semester, index) => (
              <option key={index} value={semester}>{semester}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Course Code</label>
          <input
            type="text"
            name="courseCode"
            value={formData.courseCode}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Upload File</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Upload</button>
      </form>
    </div>
  );
};

export default UploadPastQuestions;
