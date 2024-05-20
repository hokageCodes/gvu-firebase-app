import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { FaDownload, FaEye, FaFolder } from "react-icons/fa";

const StudentDashboard = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [pastQuestions, setPastQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    college: "",
    department: "",
    level: ""
  });

  const faculties = [
    {
      name: "College Of Basic And Applied Sciences",
      departments: [
        {
          name: "Mathematical And Physical Sciences (MPS)",
          levels: ["100", "200", "300", "400", "500"]
        },
        {
          name: "Chemical Sciences",
          levels: ["100", "200", "300", "400"]
        },
        {
          name: "Biological Sciences",
          levels: ["100", "200", "300", "400"]
        }
      ]
    },
    {
      name: "College Of Management And Social Sciences",
      departments: [
        {
          name: "Mass Communication",
          levels: ["100", "200", "300", "400", "500"]
        },
        {
          name: "Accounting",
          levels: ["100", "200", "300", "400", "500"]
        },
        {
          name: "Economics",
          levels: ["100", "200", "300", "400", "500"]
        },
        {
          name: "Public Administration",
          levels: ["100", "200", "300", "400", "500"]
        },
        {
          name: "Business Administration",
          levels: ["100", "200", "300", "400", "500"]
        }
      ]
    },
    {
      name: "College Of Humanities",
      departments: [
        {
          name: "Mass Communication",
          levels: ["100", "200", "300", "400", "500"]
        },
        {
          name: "Accounting",
          levels: ["100", "200", "300", "400", "500"]
        },
        {
          name: "Economics",
          levels: ["100", "200", "300", "400", "500"]
        },
        {
          name: "Public Administration",
          levels: ["100", "200", "300", "400", "500"]
        },
        {
          name: "Business Administration",
          levels: ["100", "200", "300", "400", "500"]
        }
      ]
    },
    {
      name: "College Of Law",
      departments: [
        {
          name: "Law",
          levels: ["100", "200", "300", "400", "500"]
        }
      ]
    }
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const docRef = collection(db, "users");
        const querySnapshot = await getDocs(query(docRef, where("uid", "==", currentUser.uid)));
        querySnapshot.forEach((doc) => {
          setUserData(doc.data());
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (currentUser) {
      fetchUserData();
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchPastQuestions = async () => {
      try {
        let pastQuestionsRef = collection(db, "past-questions");

        // Apply filters
        if (filters.college) {
          pastQuestionsRef = query(pastQuestionsRef, where("college", "==", filters.college));
        }
        if (filters.department) {
          pastQuestionsRef = query(pastQuestionsRef, where("department", "==", filters.department));
        }
        if (filters.level) {
          pastQuestionsRef = query(pastQuestionsRef, where("level", "==", filters.level));
        }

        const pastQuestionsSnapshot = await getDocs(pastQuestionsRef);
        const pastQuestionsData = pastQuestionsSnapshot.docs.map((doc) => doc.data());
        setPastQuestions(pastQuestionsData);
      } catch (error) {
        console.error("Error fetching past questions collection data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPastQuestions();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  if (loading) {
    return <div>Loading past questions...</div>;
  }

  const filteredDepartments = faculties.find(faculty => faculty.name === filters.college)?.departments || [];
  const filteredLevels = filteredDepartments.find(department => department.name === filters.department)?.levels || [];

  return (
    <div className="p-4 max-w-screen-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Student Dashboard</h1>
      {userData && (
        <p className="mb-4 text-center">Welcome, {userData.fullName}! Your matric number is {userData.matricNumber}.</p>
      )}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4 text-center">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="college" className="block mb-2">College:</label>
            <select
              id="college"
              name="college"
              value={filters.college}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">-- Select College --</option>
              {faculties.map((faculty, index) => (
                <option key={index} value={faculty.name}>{faculty.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="department" className="block mb-2">Department:</label>
            <select
              id="department"
              name="department"
              value={filters.department}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded"
              disabled={!filters.college}
            >
              <option value="">-- Select Department --</option>
              {filteredDepartments.map((department, index) => (
                <option key={index} value={department.name}>{department.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="level" className="block mb-2">Level:</label>
            <select
              id="level"
              name="level"
              value={filters.level}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded"
              disabled={!filters.department}
            >
              <option value="">-- Select Level --</option>
              {filteredLevels.map((level, index) => (
                <option key={index} value={level}>{level}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <h2 className="text-xl font-semibold mb-4 text-center">Past Questions</h2>
      {pastQuestions.length > 0 ? (
        <ul className="space-y-4">
          {pastQuestions.map((question, index) => (
            <li key={index} className="p-4 border border-gray-300 rounded flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center mb-4 md:mb-0">
                <FaFolder className="text-yellow-500 text-3xl mr-4" />
                <div>
                  <p className="font-semibold text-center md:text-left">{question.fileName}</p>
                  <p className="text-sm text-gray-600 text-center md:text-left">{(question.fileSize / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
              </div>
              <div className="flex space-x-4">
                <a href={question.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 flex items-center">
                  <FaEye className="mr-2" />View
                </a>
                <a href={question.fileUrl} download={question.fileName} className="text-green-500 hover:text-green-700 flex items-center">
                  <FaDownload className="mr-2" />Download
                </a>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">No past questions available.</p>
      )}
    </div>
  );
};

export default StudentDashboard;
