import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const colleges = [
  {
    name: "College Of Basic And Applied Sciences",
    departments: ["Mathematical And Physical Sciences (MPS)", "Chemical Sciences", "Biological Sciences"]
  },
  {
    name: "College Of Management And Social Sciences",
    departments: ["Mass Communication", "Accounting", "Economics", "Public Administration", "Business Administration"]
  },
  {
    name: "College Of Humanities",
    departments: ["History and Diplomatic Studies", "Languages", "Philosophy", "Religious Study", "French"]
  },
  {
    name: "College Of Law",
    departments: ["Law"]
  }
];

export default function ContactPage() {
  const { currentUser } = useAuth();
  const [fullName, setFullName] = useState('');
  const [matricNumber, setMatricNumber] = useState('');
  const [college, setCollege] = useState('');
  const [department, setDepartment] = useState('');
  const [message, setMessage] = useState('');
  const [departments, setDepartments] = useState([]);

  const handleCollegeChange = (e) => {
    const selectedCollege = e.target.value;
    setCollege(selectedCollege);
    const collegeData = colleges.find(c => c.name === selectedCollege);
    setDepartments(collegeData ? collegeData.departments : []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert('You must be logged in to send a message.');
      return;
    }
    
    const messageData = {
      fullName,
      matricNumber,
      college,
      department,
      message,
      userId: currentUser.uid,
      createdAt: Timestamp.now()
    };

    try {
      await addDoc(collection(db, 'messages'), messageData);
      alert('Message sent successfully.');
      setFullName('');
      setMatricNumber('');
      setCollege('');
      setDepartment('');
      setMessage('');
      setDepartments([]);
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again later.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-semibold mt-24">Contact Information</h3>
          <p className="text-lg mb-4 max-w-md mx-auto">
            You can reach us through the following contact details or fill out the form to send us a message directly.
          </p>
          <ul className="list-none space-y-4">
            <li className="flex items-center justify-center">
              <span className="text-blue-600 mr-2">📧</span> 
              <span>Email: gvupastquestions@gmail.com</span>
            </li>
            <li className="flex items-center justify-center">
              <span className="text-blue-600 mr-2">📞</span> 
              <span>Phone: +234 90 154 2031 54</span>
            </li>
            <li className="flex items-center justify-center">
              <span className="text-blue-600 mr-2">📍</span> 
              <span>Office Hours: Mon - Fri, 9:00 AM - 5:00 PM</span>
            </li>
          </ul>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Contact Form</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Full Name</label>
              <input
                type="text"
                id="fullName"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="John Doe"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="matricNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Matric Number</label>
              <input
                type="text"
                id="matricNumber"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="ABC123456"
                required
                value={matricNumber}
                onChange={(e) => setMatricNumber(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="college" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">College</label>
              <select
                id="college"
                className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                required
                value={college}
                onChange={handleCollegeChange}
              >
                <option value="">Select your college</option>
                {colleges.map((college) => (
                  <option key={college.name} value={college.name}>{college.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="department" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Department</label>
              <select
                id="department"
                className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                required
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                disabled={!college}
              >
                <option value="">Select your department</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your message</label>
              <textarea
                id="message"
                rows="6"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Leave a comment..."
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            <button
              type="submit"
              className="py-3 px-5 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Send message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
