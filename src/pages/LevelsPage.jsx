import React from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import the useAuth hook
import { useNavigate } from "react-router-dom"; // Import useNavigate

function LevelsPage() {
  const { facultyId, departmentId } = useParams();
  const { currentUser } = useAuth(); // Get the currentUser from the AuthContext
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const levels = [
    { level: "100 Level", description: "Our 100 level student learning resources cover various Courses, ensuring that you have access to materials that align with your coursework and academic goals.", imageUrl: "/assets/book1.png" },
    { level: "200 Level", description: "Our 200 level student learning resources cover various Courses, ensuring that you have access to materials that align with your coursework and academic goals.", imageUrl: "/assets/book2.jpg" },
    { level: "300 Level", description: "Our 300 level student learning resources cover various Courses, ensuring that you have access to materials that align with your coursework and academic goals.", imageUrl: "/assets/book3.png" },
    { level: "400 Level", description: "Our 400 level student learning resources cover various Courses, ensuring that you have access to materials that align with your coursework and academic goals.", imageUrl: "/assets/book4.jpg" },
  ];

  // Function to handle redirection if user is not logged in
  const handleExploreClick = (levelInfo) => {
    if (currentUser) {
      navigate(`/past-questions/${facultyId}/${departmentId}/${levelInfo.level.split(" ")[0]}`); // Use navigate instead of history.push
    } else {
      navigate("/login"); // Redirect to login page if user is not logged in
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Select Your Level</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {levels.map((levelInfo, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
            <img src={levelInfo.imageUrl} alt={`${levelInfo.level} image`} className="mx-auto mb-4 h-32 w-32 object-contain"/>
            <h3 className="text-2xl font-semibold mb-2">{levelInfo.level}</h3>
            <p className="text-gray-600 mb-4">{levelInfo.description}</p>
            <button onClick={() => handleExploreClick(levelInfo)} className="text-blue-500 font-semibold hover:underline">
              Explore Past Questions
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LevelsPage;
