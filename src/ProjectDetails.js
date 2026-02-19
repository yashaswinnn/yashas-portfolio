import React from "react";
import { useParams, Link } from "react-router-dom";
import "./App.css";

function ProjectDetails() {
  const { id } = useParams();

  return (
    <div className="project-page">

      <Link to="/" className="back-btn">← Back to Home</Link>

      <div className="project-container">

        {id === "resume" && (
          <>
            <h1 className="project-title">AI Based Resume Builder</h1>

            <p>
              The AI-Based Resume Builder is an intelligent web application 
              designed to help job seekers create professional and ATS-friendly resumes efficiently.
            </p>

            <p>
              It integrates Artificial Intelligence (AI), Machine Learning (ML), 
              and Natural Language Processing (NLP) to automate resume writing 
              and optimize content according to job requirements.
            </p>

            <h3>Key Features</h3>
            <ul>
              <li>User-friendly interface built with Streamlit</li>
              <li>AI-generated professional summary and experience descriptions</li>
              <li>Keyword extraction from job descriptions</li>
              <li>ATS optimization and resume scoring system</li>
              <li>Real-time grammar checking and improvement suggestions</li>
              <li>PDF resume export functionality</li>
            </ul>

            <h3>Technical Architecture</h3>
            <ul>
              <li><strong>Frontend:</strong> Streamlit</li>
              <li><strong>Backend:</strong> Python processing logic</li>
              <li><strong>AI Engine:</strong> OpenAI API</li>
              <li><strong>Document Processing:</strong> Markdown → HTML → PDF (PDFKit, wkhtmltopdf)</li>
              <li><strong>Storage:</strong> Database for user data and resume storage</li>
            </ul>

            <p>
              Overall, this system automates resume writing, enhances resume quality,
              saves time, and significantly increases candidates’ chances of getting shortlisted.
            </p>
          </>
        )}

        {id === "retinopathy" && (
          <>
            <h1 className="project-title">
              Diabetic Retinopathy Detection System
            </h1>

            <p>
              This system analyzes retinal fundus images using a hybrid deep-learning 
              model combining DenseNet201 and ResNet50.
            </p>

            <p>
              Users can upload retinal images (JPG, JPEG, PNG), and the model
              extracts important retinal features such as blood vessel patterns,
              microaneurysms, hemorrhages, and exudates.
            </p>

            <h3>System Features</h3>
            <ul>
              <li>Drag-and-drop image upload interface</li>
              <li>Stage prediction with confidence score</li>
              <ul>
              <li><strong>Five-class classification:</strong>

                <ul>
                  <li>No DR</li>
                  <li>Mild</li>
                  <li>Moderate</li>
                  <li>Severe</li>
                  <li>Proliferative DR</li>
                </ul>
              </li>
              </ul>
              <li>Progress bar visualization for class probabilities</li>
              <li>Transparent AI decision support</li>
            </ul>

            <p>
              In testing, the system predicted Severe Diabetic Retinopathy 
              with a confidence score of 57.05%.
            </p>

            <p>
              This project serves as an AI-powered screening and decision-support
              system to assist healthcare professionals in early detection and 
              severity grading of diabetic retinopathy.
            </p>
          </>
        )}

      </div>
    </div>
  );
}

export default ProjectDetails;
