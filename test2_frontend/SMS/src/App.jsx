import StudentList from "./components/StudentList";
import StudentForm from "./components/StudentForm";

function App() {
  return (
    <div>
      <h1>Student Management System</h1>
      <StudentForm />
      <StudentList />
    </div>
  );
}

export default App;
