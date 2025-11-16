import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import System from "./pages/System";
import Charges from "./pages/Charges";
import Scholarship from "./pages/Scholarship";
import Summary from "./pages/Summary";
import PersonalData from "./pages/PersonalData";
import Payment from "./pages/Payment";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/payment" element={<Payment />} />
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/system" element={<Layout><System /></Layout>} />
        <Route path="/charges" element={<Layout><Charges /></Layout>} />
        <Route path="/scholarship" element={<Layout><Scholarship /></Layout>} />
        <Route path="/summary" element={<Layout><Summary /></Layout>} />
        <Route path="/personal-data" element={<Layout><PersonalData /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
