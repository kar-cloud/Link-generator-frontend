import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginMember from "./components/Auth/loginMember";
import RegisterMember from "./components/Auth/registerMember";
import Home from "./components/Home/home";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginMember />} />
          <Route exact path="/register" element={<RegisterMember />} />
          <Route exact path="/home" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
