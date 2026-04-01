

import { useState } from "react";

// --- Each question card props ---
function QuestionCard({ question, index, onDelete, onChange }) {
  return (
    <div style={{
      background: "white",
      border: "1px solid #e0e0e0",
      borderRadius: "12px",
      padding: "20px",
      marginBottom: "16px"
    }}>
      {/* Question number */}
      <p style={{ margin: "0 0 8px", color: "#888", fontSize: "13px" }}>
        Question {index + 1}
      </p>

      {/* Question label input props */}
      <input
        type="text"
        placeholder="Type your question here..."
        value={question.label}
        onChange={(e) => onChange(index, "label", e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "15px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          marginBottom: "12px",
          boxSizing: "border-box"
        }}
      />

      {/* Answer type selector */}
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <label style={{ fontSize: "13px", color: "#555" }}>Answer type:</label>
        <select
          value={question.type}
          onChange={(e) => onChange(index, "type", e.target.value)}
          style={{
            padding: "6px 10px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            fontSize: "13px",
            flex: 1
          }}
        >
          <option value="short">Short text</option>
          <option value="long">Long text</option>
          <option value="yesno">Yes / No</option>
          <option value="number">Number</option>
        </select>

        {/* Delete button */}
        <button
          onClick={() => onDelete(index)}
          style={{
            background: "#fff0f0",
            color: "#e53935",
            border: "1px solid #ffcdd2",
            borderRadius: "8px",
            padding: "6px 12px",
            cursor: "pointer",
            fontSize: "13px"
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

// --- Preview of the form ---
function FormPreview({ title, questions }) {
  // We store each answer in an object: { 0: "...", 1: "...", ... }
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleAnswer(index, value) {
    setAnswers({ ...answers, [index]: value });
  }

  if (submitted) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <div style={{ fontSize: "48px" }}>🎉</div>
        <h2 style={{ color: "#333" }}>Response submitted!</h2>
        <button
          onClick={() => { setSubmitted(false); setAnswers({}); }}
          style={{
            padding: "10px 24px",
            background: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            marginTop: "12px"
          }}
        >
          Submit another
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ marginTop: 0, color: "#111" }}>{title || "Untitled Form"}</h2>

      {questions.length === 0 && (
        <p style={{ color: "#aaa", fontStyle: "italic" }}>
          No questions yet. Add some in the Editor tab!
        </p>
      )}

      {questions.map((q, i) => (
        <div
          key={i}
          style={{
            background: "white",
            border: "1px solid #e0e0e0",
            borderRadius: "12px",
            padding: "20px",
            marginBottom: "16px"
          }}
        >
          {/* Question label */}
          <p style={{ margin: "0 0 12px", fontWeight: "500", color: "#222" }}>
            {q.label || `Question ${i + 1}`}
          </p>

          {/* Render the right input based on type */}
          {q.type === "short" && (
            <input
              type="text"
              placeholder="Your answer..."
              value={answers[i] || ""}
              onChange={(e) => handleAnswer(i, e.target.value)}
              style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "8px", boxSizing: "border-box", fontSize: "14px" }}
            />
          )}

          {q.type === "long" && (
            <textarea
              placeholder="Your answer..."
              value={answers[i] || ""}
              onChange={(e) => handleAnswer(i, e.target.value)}
              rows={4}
              style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "8px", boxSizing: "border-box", fontSize: "14px", resize: "vertical" }}
            />
          )}

          {q.type === "yesno" && (
            <div style={{ display: "flex", gap: "12px" }}>
              {["Yes", "No"].map((option) => (
                <label key={option} style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", fontSize: "14px" }}>
                  <input
                    type="radio"
                    name={`question-${i}`}
                    value={option}
                    checked={answers[i] === option}
                    onChange={() => handleAnswer(i, option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          )}

          {q.type === "number" && (
            <input
              type="number"
              placeholder="0"
              value={answers[i] || ""}
              onChange={(e) => handleAnswer(i, e.target.value)}
              style={{ width: "120px", padding: "10px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "14px" }}
            />
          )}
        </div>
      ))}

      {questions.length > 0 && (
        <button
          onClick={() => setSubmitted(true)}
          style={{
            padding: "12px 28px",
            background: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "15px",
            fontWeight: "600"
          }}
        >
          Submit
        </button>
      )}
    </div>
  );
}

// --- Main App ---
export default function App() {
  // Form title
  const [title, setTitle] = useState("My Form");

  // List of questions — each is an object { label, type }
  const [questions, setQuestions] = useState([
    { label: "Enter your name?", type: "short" },
    { label: "Do you agree?", type: "yesno" }
  ]);

  // Which tab is active: "editor" or "preview"
  const [activeTab, setActiveTab] = useState("editor");

  // Add a new blank question
  function addQuestion() {
    setQuestions([...questions, { label: "", type: "short" }]);
  }

  // Delete a question at a given index
  function deleteQuestion(index) {
    const updated = questions.filter((_, i) => i !== index);
    setQuestions(updated);
  }

  // Update a field in a question
  function updateQuestion(index, field, value) {
    const updated = questions.map((q, i) => {
      if (i === index) {
        return { ...q, [field]: value }; 
      }
      return q;
    });
    setQuestions(updated);
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f5f5f5",
      fontFamily: "system-ui, sans-serif"
    }}>

      {/* Top bar */}
      <div style={{
        background: "white",
        borderBottom: "1px solid #e0e0e0",
        padding: "12px 24px",
        display: "flex",
        alignItems: "center",
        gap: "16px"
      }}>
        <span style={{ fontSize: "20px" }}>📋</span>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            fontSize: "16px",
            fontWeight: "600",
            border: "none",
            outline: "none",
            flex: 1,
            background: "transparent"
          }}
        />

        {/* Tab buttons */}
        {["editor", "preview"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "8px 18px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: activeTab === tab ? "600" : "400",
              background: activeTab === tab ? "#4f46e5" : "#f0f0f0",
              color: activeTab === tab ? "white" : "#555",
              fontSize: "14px",
              textTransform: "capitalize"
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main content */}
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "24px 16px" }}>

        {activeTab === "editor" && (
          <div>
            {/* Render each question card */}
            {questions.map((q, i) => (
              <QuestionCard
                key={i}
                question={q}
                index={i}
                onDelete={deleteQuestion}
                onChange={updateQuestion}
              />
            ))}

            {/* Add question button */}
            <button
              onClick={addQuestion}
              style={{
                width: "100%",
                padding: "14px",
                border: "2px dashed #ccc",
                borderRadius: "12px",
                background: "white",
                cursor: "pointer",
                fontSize: "15px",
                color: "#666",
                marginTop: "8px"
              }}
            >
              + Add question
            </button>

            {/* Summary */}
            <p style={{ color: "#aaa", fontSize: "13px", textAlign: "center", marginTop: "16px" }}>
              {questions.length} question{questions.length !== 1 ? "s" : ""}
            </p>
          </div>
        )}

        {activeTab === "preview" && (
          <div style={{
            background: "white",
            borderRadius: "12px",
            padding: "24px",
            border: "1px solid #e0e0e0"
          }}>
            <FormPreview title={title} questions={questions} />
          </div>
        )}
      </div>
    </div>
  );
}
