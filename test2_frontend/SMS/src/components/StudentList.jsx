import React, { useState, useEffect } from "react";
import axios from "axios";
import "./StudentList.css"; // Importing CSS for styling

const API_URL = "http://localhost:5000/students"; // Backend URL

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [studentData, setStudentData] = useState({ name: "", age: "", course: "" });
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(API_URL);
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleChange = (e) => {
    setStudentData({ ...studentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!studentData.name || !studentData.age || !studentData.course) {
      alert("Please fill in all fields!");
      return;
    }

    try {
      if (editingStudent) {
        await axios.put(`${API_URL}/${editingStudent._id}`, studentData);
        setEditingStudent(null);
      } else {
        await axios.post(API_URL, studentData);
      }
      setStudentData({ name: "", age: "", course: "" });
      fetchStudents();
    } catch (error) {
      console.error("Error saving student:", error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const startEditing = (student) => {
    setEditingStudent(student);
    setStudentData({ name: student.name, age: student.age, course: student.course });
  };

  return (
    <div className="container">
      

      <div className="form-container">
        <h3>{editingStudent ? "✏️ Edit Student" : "➕ Add New Student"}</h3>
        <input type="text" name="name" placeholder="Enter Name" value={studentData.name} onChange={handleChange} />
        <input type="number" name="age" placeholder="Enter Age" value={studentData.age} onChange={handleChange} />
        <input type="text" name="course" placeholder="Enter Course" value={studentData.course} onChange={handleChange} />
        <button className="btn" onClick={handleSubmit}>
          {editingStudent ? "✅ Update Student" : "➕ Add Student"}
        </button>
      </div>

      <h3>📋 Student List</h3>
      <ul className="student-list">
        {students.map((student) => (
          <li key={student._id} className="student-item">
            <span>{student.name} - {student.age} - {student.course}</span>
            <div>
              <button className="edit-btn" onClick={() => startEditing(student)}>✏️ Edit</button>
              <button className="delete-btn" onClick={() => deleteStudent(student._id)}>❌ Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
