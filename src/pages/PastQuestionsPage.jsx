// PastQuestionsPage.js
import React from "react";
import { Link } from "react-router-dom";
import facultiesData from "../data/faculties.json";
import DepartmentCard from "../components/past-questions/DepartmentCard";

function PastQuestionsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">Past Questions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {facultiesData.faculties.map((faculty, index) => (
          <Link to={`/departments/${index}`} key={index}>
            <DepartmentCard
              name={faculty.name}
              description="Explore the various departments, and courses that we offer in our esteemed colleges"
              imageUrl={faculty.imageUrl}
              isCollege={true} // Pass a prop to indicate it's a college
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PastQuestionsPage;
