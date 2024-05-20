// LevelsPage.jsx
import React from "react";
import { useParams } from "react-router-dom";
import facultiesData from "../data/faculties.json";

function LevelsPage() {
  const { facultyId, departmentId } = useParams();

  // Ensure the facultyId and departmentId are valid indices within the facultiesData array
  if (
    isNaN(facultyId) ||
    isNaN(departmentId) ||
    facultyId < 0 ||
    facultyId >= facultiesData.faculties.length ||
    departmentId < 0 ||
    departmentId >= facultiesData.faculties[facultyId].departments.length
  ) {
    return <div>Invalid faculty ID or department ID</div>;
  }

  // Find the selected department
  const selectedDepartment = facultiesData.faculties[facultyId].departments[departmentId];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">{selectedDepartment.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {selectedDepartment.levels.map((level, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            <h3 className="text-xl font-semibold mb-2">Level {level}</h3>
            <p className="text-gray-600">Click to explore</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LevelsPage;
