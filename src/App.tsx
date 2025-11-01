import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import System from "./pages/System";
import Charges from "./pages/Charges";
import Scholarship from "./pages/Scholarship";
import Summary from "./pages/Summary";
import PersonalData from "./pages/PersonalData";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/system" element={<System />} />
          <Route path="/charges" element={<Charges />} />
          <Route path="/scholarship" element={<Scholarship />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/personal-data" element={<PersonalData />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
