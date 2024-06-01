import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import facultiesData from "../../data/faculties.json";
import { HiOutlineDocumentDownload } from "react-icons/hi"; // Importing an icon for download

function PQsTable() {
  const { facultyId, departmentId } = useParams();
  const [pastQuestions, setPastQuestions] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");

  const levels = ["100", "200", "300", "400"];
  const semesters = ["1st", "2nd"];

  useEffect(() => {
    const fetchPastQuestions = async () => {
      try {
        const pastQuestionsRef = collection(db, "past-questions");
        let q = query(
          pastQuestionsRef,
          where("college", "==", facultiesData.faculties[facultyId].name),
          where("department", "==", facultiesData.faculties[facultyId].departments[departmentId].name)
        );

        if (selectedLevel) {
          q = query(q, where("level", "==", selectedLevel));
        }

        if (selectedSemester) {
          q = query(q, where("semester", "==", selectedSemester));
        }

        const querySnapshot = await getDocs(q);

        const pastQuestionsData = [];
        querySnapshot.forEach((doc) => {
          pastQuestionsData.push(doc.data());
        });

        setPastQuestions(pastQuestionsData);
      } catch (error) {
        console.error("Error fetching past questions:", error);
      }
    };

    fetchPastQuestions();
  }, [facultyId, departmentId, selectedLevel, selectedSemester]);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">{facultiesData.faculties[facultyId].departments[departmentId].name}</h2>

      <div className="flex flex-col sm:flex-row sm:justify-between mb-4">
        <div className="flex flex-col mb-4 sm:mb-0">
          <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">Level</label>
          <select
            id="level"
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="block w-full sm:w-36 pl-3 pr-8 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">All Levels</option>
            {levels.map((level) => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="semester" className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
          <select
            id="semester"
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="block w-full sm:w-36 pl-3 pr-8 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">All Semesters</option>
            {semesters.map((semester) => (
              <option key={semester} value={semester}>{semester}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-400 w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 px-4 py-2">Level</th>
              <th className="border border-gray-400 px-4 py-2">Course Code</th>
              <th className="border border-gray-400 px-4 py-2">File Name</th>
              <th className="border border-gray-400 px-4 py-2">File Size</th>
              <th className="border border-gray-400 px-4 py-2">Session/Year</th>
              <th className="border border-gray-400 px-4 py-2">Semester</th>
              <th className="border border-gray-400 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pastQuestions.map((question, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border border-gray-400 px-4 py-2 text-center">{question.level}</td>
                <td className="border border-gray-400 px-4 py-2">{question.courseCode}</td>
                <td className="border border-gray-400 px-4 py-2">{question.fileName}</td>
                <td className="border border-gray-400 px-4 py-2 text-center">{formatFileSize(question.fileSize)}</td>
                <td className="border border-gray-400 px-4 py-2 text-center">{question.year}</td>
                <td className="border border-gray-400 px-4 py-2 text-center">{question.semester}</td>
                <td className="border border-gray-400 px-4 py-2 text-center">
                  <a href={question.fileUrl} download className="text-blue-500 font-semibold hover:underline flex items-center justify-center">
                    <HiOutlineDocumentDownload className="mr-1" /> Download
                  </a>
                </td>
              </tr>
            ))}
            {pastQuestions.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4">No past questions available for the selected filters.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PQsTable;
