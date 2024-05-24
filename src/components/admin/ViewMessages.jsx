import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { FaTrash } from 'react-icons/fa';

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

export default function ViewMessages() {
  const { isAdmin, loading } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [collegeFilter, setCollegeFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [filteredMessages, setFilteredMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messagesSnapshot = await getDocs(collection(db, 'messages'));
        const messagesData = messagesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMessages(messagesData);
        setLoadingMessages(false);
      } catch (error) {
        console.error('Error fetching messages:', error);
        setLoadingMessages(false);
      }
    };

    if (isAdmin) {
      fetchMessages();
    }
  }, [isAdmin]);

  useEffect(() => {
    let filtered = messages;
    if (collegeFilter) {
      filtered = filtered.filter(message => message.college === collegeFilter);
    }
    if (departmentFilter) {
      filtered = filtered.filter(message => message.department === departmentFilter);
    }
    setFilteredMessages(filtered);
  }, [collegeFilter, departmentFilter, messages]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'messages', id));
      setMessages(messages.filter(message => message.id !== id));
      alert('Message deleted successfully.');
    } catch (error) {
      console.error('Error deleting message:', error);
      alert('Failed to delete message. Please try again later.');
    }
  };

  if (loading || loadingMessages) {
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    return <div>You do not have permission to view this page.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">View Messages</h2>
      <div className="mb-4 flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
        <select
          className="p-2 md:p-3 border rounded text-sm md:text-base"
          value={collegeFilter}
          onChange={(e) => setCollegeFilter(e.target.value)}
        >
          <option value="">Filter by College</option>
          {colleges.map((college) => (
            <option key={college.name} value={college.name}>{college.name}</option>
          ))}
        </select>
        <select
          className="p-2 md:p-3 border rounded text-sm md:text-base"
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          disabled={!collegeFilter}
        >
          <option value="">Filter by Department</option>
          {collegeFilter && colleges.find(col => col.name === collegeFilter)?.departments.map((dept) => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredMessages.map((message) => (
          <div key={message.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 md:p-6 relative">
            <button
              onClick={() => handleDelete(message.id)}
              className="absolute top-2 right-2 text-red-600 hover:text-red-800"
            >
              <FaTrash />
            </button>
            <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-900 dark:text-white">{message.fullName}</h3>
            <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-2">Matric Number: {message.matricNumber}</p>
            <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-2">College: {message.college}</p>
            <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-2">Department: {message.department}</p>
            <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-4">{message.message}</p>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Submitted on: {new Date(message.createdAt.seconds * 1000).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
