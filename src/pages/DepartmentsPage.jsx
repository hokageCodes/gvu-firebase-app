import React from "react";
import { Link, useParams } from "react-router-dom";
import facultiesData from "../data/faculties.json";
import DepartmentCard from "../components/past-questions/DepartmentCard";

function DepartmentsPage() {
  const { facultyId } = useParams();

  if (isNaN(facultyId) || facultyId < 0 || facultyId >= facultiesData.faculties.length) {
    return <div>Invalid faculty ID</div>;
  }

  const selectedFaculty = facultiesData.faculties[facultyId];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">{selectedFaculty.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {selectedFaculty.departments.map((department, index) => (
          <Link to={`/levels/${facultyId}/${index}`} key={index}>
            <DepartmentCard
              name={department.name}
              description="Explore this department's courses and resources."
              imageUrl={selectedFaculty.imageUrl} // Default image for all departments
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default DepartmentsPage;
