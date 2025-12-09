import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Sidebar from './Layout/Sidebar';
import '../src/assets/css/all.css';
import Routing from './Layout/Routing';

function App() {

  return (
    <>
      <Router>

        {/* Sidebar Fixed on Left */}
        <Sidebar />

        {/* Main Content Area */}
        <div style={{ marginLeft: "260px", padding: "20px" }}>

          <Routes>
            {
              Routing.map((ele, index) => (
                <Route key={index} path={ele.path} element={<ele.element />} />
              ))
            }
          </Routes>

        </div>

      </Router>
    </>
  );
}

export default App;
