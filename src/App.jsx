import { Link, Routes, Route, Navigate, useRoutes } from "react-router-dom";
import "./App.css";
import Create from "./routes/Create";
import Gallery from "./routes/Gallery";
import Home from "./routes/Home";
import MemberDetail from "./routes/MemberDetail";
import EditMember from "./routes/EditMember";

function App() {
  let element = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/create",
      element: <Create />,
    },
    {
      path: "/gallery",
      element: <Gallery />,
    },
    {
      path: "/member/:id",
      element: <MemberDetail />,
    },
    {
      path: "/edit/:id",
      element: <EditMember />,
    },
  ]);

  return (
    <div className="app-container">
      <div className="sidebar">
        <h2>Italian Brainrot Squad</h2>
        <ul>
          <li>
            <Link to="/" className="no-highlight">
              Home
            </Link>
          </li>
          <li>
            <Link to="/create" className="no-highlight">
              Create
            </Link>
          </li>
          <li>
            <Link to="/gallery" className="no-highlight">
              Gallery
            </Link>
          </li>
        </ul>
      </div>
      <div className="content">{element}</div>
    </div>
  );
}

export default App;
