import { useState } from "react";
import axios from "axios";

function App() {
  const [pdfUrl, setPdfUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [studentId, setStudentId] = useState("");

  const [concept, setConcept] = useState(0);
  const [formula, setFormula] = useState(0);
  const [calculation, setCalculation] = useState(0);

  const [step1, setStep1] = useState(0);
  const [step2, setStep2] = useState(0);

  const [evaluations, setEvaluations] = useState([]);

  const q1Total = concept + formula + calculation;
  const q2Total = step1 + step2;
  const finalTotal = q1Total + q2Total;

  // Upload PDF
  const uploadPDF = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setSelectedFile(file);

    const formData = new FormData();
    formData.append("pdf", file);

    const res = await axios.post(
      "http://localhost:5000/api/upload",
      formData
    );

    setPdfUrl(
      "http://localhost:5000/uploads/" +
      res.data.filePath
    );
  };

  // Auto Evaluate
 const autoEvaluate = async () => {
  try {

    if (!selectedFile) {
      alert("Please upload PDF first");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    const res = await axios.post(
      "http://localhost:5000/auto-evaluate",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    setConcept(res.data.marks.concept || 0);
setFormula(res.data.marks.formula || 0);
setCalculation(res.data.marks.calculation || 0);

setStep1(res.data.marks.step1 || 0);
setStep2(res.data.marks.step2 || 0);
    alert("AI Evaluation Complete");

  } catch (err) {
    console.error(err);
    alert("Evaluation Failed");
  }
};

  // Save Evaluation
  const saveEvaluation = async () => {
    await axios.post(
      "http://localhost:5000/api/evaluations/save",
      {
        studentId,
        concept,
        formula,
        calculation,
        step1,
        step2,
        q1Total,
        q2Total,
        finalTotal,
      }
    );

    alert("Saved!");
  };

  // Load Evaluations
  const loadEvaluations = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/evaluations"
    );

    setEvaluations(res.data);
  };

  // Clear Form
  const clearForm = () => {
    setStudentId("");
    setConcept(0);
    setFormula(0);
    setCalculation(0);
    setStep1(0);
    setStep2(0);
  };

  return (
    <div className="container">
      <h1>Rubric Marking System</h1>

      <div className="card">
        <h2>PDF Upload</h2>

        <input
          type="file"
          onChange={uploadPDF}
        />

        {pdfUrl && (
          <iframe
            src={pdfUrl}
            width="100%"
            height="250"
            title="PDF"
          />
        )}
      </div>

      <div className="card">
        <h2>Student ID</h2>

        <input
          value={studentId}
          onChange={(e) =>
            setStudentId(e.target.value)
          }
          placeholder="Enter Student ID"
        />
      </div>

      <div className="card">
        <h2>Question 1</h2>

        <div className="input-group">

          <div className="input-box">
            <label>Concept (Max 3)</label>

            <input
              type="number"
              value={concept}
              onChange={(e) =>
                setConcept(
                  Number(e.target.value)
                )
              }
            />
          </div>

          <div className="input-box">
            <label>Formula (Max 2)</label>

            <input
              type="number"
              value={formula}
              onChange={(e) =>
                setFormula(
                  Number(e.target.value)
                )
              }
            />
          </div>

          <div className="input-box">
            <label>Calculation (Max 5)</label>

            <input
              type="number"
              value={calculation}
              onChange={(e) =>
                setCalculation(
                  Number(e.target.value)
                )
              }
            />
          </div>

        </div>

        <div className="total-box">
          Question 1 Total: {q1Total}/10
        </div>
      </div>

      <div className="card">
        <h2>Question 2</h2>

        <div className="input-group">

          <div className="input-box">
            <label>Step 1 (Max 2)</label>

            <input
              type="number"
              value={step1}
              onChange={(e) =>
                setStep1(
                  Number(e.target.value)
                )
              }
            />
          </div>

          <div className="input-box">
            <label>Step 2 (Max 3)</label>

            <input
              type="number"
              value={step2}
              onChange={(e) =>
                setStep2(
                  Number(e.target.value)
                )
              }
            />
          </div>

        </div>

        <div className="total-box">
          Question 2 Total: {q2Total}/5
        </div>
      </div>

      <div className="final-box">
        Final Total: {finalTotal}/15
      </div>

      <div className="button-group">

        <button
          className="btn-review"
          onClick={autoEvaluate}
        >
          Auto Evaluate
        </button>

        <button
          className="btn-save"
          onClick={saveEvaluation}
        >
          Save
        </button>

        <button
          className="btn-next"
          onClick={clearForm}
        >
          Next
        </button>

        <button
          className="btn-review"
          onClick={loadEvaluations}
        >
          Review
        </button>

        <button
          className="btn-clear"
          onClick={clearForm}
        >
          Clear
        </button>

      </div>

      <h2>Saved Evaluations</h2>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Q1</th>
            <th>Q2</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          {evaluations.map((e) => (
            <tr key={e._id}>
              <td>{e.studentId}</td>
              <td>{e.q1Total}</td>
              <td>{e.q2Total}</td>
              <td>{e.finalTotal}</td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default App;