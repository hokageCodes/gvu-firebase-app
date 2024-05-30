// LevelsPage.jsx
import React from "react";
import { Link } from "react-router-dom";

function LevelsPage() {
  const levels = [
    { level: "100 Level", description: "Our 100 level student learning resources cover various Courses, ensuring that you have access to materials that align with your coursework and academic goals.", imageUrl: "path/to/100-level-image.png" },
    { level: "200 Level", description: "Our 200 level student learning resources cover various Courses, ensuring that you have access to materials that align with your coursework and academic goals.", imageUrl: "path/to/200-level-image.png" },
    { level: "300 Level", description: "Our 300 level student learning resources cover various Courses, ensuring that you have access to materials that align with your coursework and academic goals.", imageUrl: "path/to/300-level-image.png" },
    { level: "400 Level", description: "Our 400 level student learning resources cover various Courses, ensuring that you have access to materials that align with your coursework and academic goals.", imageUrl: "path/to/400-level-image.png" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Select Your Level</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {levels.map((levelInfo, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
            <img src={levelInfo.imageUrl} alt={`${levelInfo.level} image`} className="mx-auto mb-4 h-32 w-32 object-contain"/>
            <h3 className="text-2xl font-semibold mb-2">{levelInfo.level}</h3>
            <p className="text-gray-600 mb-4">{levelInfo.description}</p>
            <Link to={`/past-questions/${index}`} className="text-blue-500 font-semibold hover:underline">
              Explore Past Questions
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LevelsPage;
