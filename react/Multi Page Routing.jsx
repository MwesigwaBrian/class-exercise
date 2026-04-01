
import { useState } from "react";
import {
  RouterProvider,
  Router,
  Route,
  RootRoute,
  Link,
  Outlet
} from "@tanstack/react-router";

// Question Card Component 
function QuestionCard({ question, index, onDelete, onChange }) {
  return (
    <div style={{ background: "white", padding: "16px", marginBottom: "12px", borderRadius: "10px" }}>
      <p>Question {index + 1}</p>

      <input
        value={question.label}
        onChange={(e) => onChange(index, "label", e.target.value)}
        placeholder="Enter question"
      />

      <select
        value={question.type}
        onChange={(e) => onChange(index, "type", e.target.value)}
      >
        <option value="short">Short text</option>
        <option value="long">Long text</option>
        <option value="yesno">Yes / No</option>
        <option value="number">Number</option>
      </select>

      <button onClick={() => onDelete(index)}>Delete</button>
    </div>
  );
}

// --- Form Preview ---
function FormPreview({ title, questions }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleAnswer(index, value) {
    setAnswers({ ...answers, [index]: value });
  }

  if (submitted) {
    return <h2>Submitted 🎉</h2>;
  }

  return (
    <div>
      <h2>{title}</h2>

      {questions.map((q, i) => (
        <div key={i}>
          <p>{q.label}</p>

          {q.type === "short" && (
            <input onChange={(e) => handleAnswer(i, e.target.value)} />
          )}

          {q.type === "long" && (
            <textarea onChange={(e) => handleAnswer(i, e.target.value)} />
          )}

          {q.type === "yesno" && (
            <>
              <label>
                <input type="radio" name={i} onChange={() => handleAnswer(i, "Yes")} />
                Yes
              </label>
              <label>
                <input type="radio" name={i} onChange={() => handleAnswer(i, "No")} />
                No
              </label>
            </>
          )}

          {q.type === "number" && (
            <input type="number" onChange={(e) => handleAnswer(i, e.target.value)} />
          )}
        </div>
      ))}

      <button onClick={() => setSubmitted(true)}>Submit</button>
    </div>
  );
}

// --- Pages ---
function EditorPage({ questions, addQuestion, deleteQuestion, updateQuestion }) {
  return (
    <div>
      {questions.map((q, i) => (
        <QuestionCard
          key={i}
          question={q}
          index={i}
          onDelete={deleteQuestion}
          onChange={updateQuestion}
        />
      ))}

      <button onClick={addQuestion}>+ Add Question</button>
    </div>
  );
}

function PreviewPage({ title, questions }) {
  return <FormPreview title={title} questions={questions} />;
}

// --- Layout ---
function Layout({ title, setTitle }) {
  return (
    <div>
      <div style={{ background: "#eee", padding: "10px", display: "flex", gap: "10px" }}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />

        <Link to="/editor">Editor</Link>
        <Link to="/preview">Preview</Link>
      </div>

      <Outlet />
    </div>
  );
}

//  Main App component with routes and state management
export default function App() {
  const [title, setTitle] = useState("My Form");
  const [questions, setQuestions] = useState([
    { label: "What is your name?", type: "short" }
  ]);

  function addQuestion() {
    setQuestions([...questions, { label: "", type: "short" }]);
  }

  function deleteQuestion(index) {
    setQuestions(questions.filter((_, i) => i !== index));
  }

  function updateQuestion(index, field, value) {
    const updated = questions.map((q, i) =>
      i === index ? { ...q, [field]: value } : q
    );
    setQuestions(updated);
  }

  //  ROUTES 
  const rootRoute = new RootRoute({
    component: () => <Layout title={title} setTitle={setTitle} />,
  });

  const editorRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/editor",
    component: () => (
      <EditorPage
        questions={questions}
        addQuestion={addQuestion}
        deleteQuestion={deleteQuestion}
        updateQuestion={updateQuestion}
      />
    ),
  });

  const previewRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/preview",
    component: () => (
      <PreviewPage title={title} questions={questions} />
    ),
  });

  const router = new Router({
    routeTree: rootRoute.addChildren([editorRoute, previewRoute]),
  });

  return <RouterProvider router={router} />;
}