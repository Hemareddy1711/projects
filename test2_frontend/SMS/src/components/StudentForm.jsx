import { useState } from "react";
import axios from "axios";

const StudentForm = () => {
  const [student, setStudent] = useState({ name: "", age: "", course: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/students", student)
      .then(() => alert("Student added successfully"))
      .catch((err) => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" onChange={(e) => setStudent({ ...student, name: e.target.value })} required />
      <input type="number" placeholder="Age" onChange={(e) => setStudent({ ...student, age: e.target.value })} required />
      <input type="text" placeholder="Course" onChange={(e) => setStudent({ ...student, course: e.target.value })} required />
      <button type="submit">Add Student</button>
    </form>
  );
};

export default StudentForm;
