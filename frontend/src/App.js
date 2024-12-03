import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StartPage from "./common/StartPage/StartPage.jsx";
import HomePage from "./common/Home/HomePage.jsx";
import DashboardPage from "./common/DashboardPage/DashboardPage.jsx";
import RoomPage from "./common/RoomPage/RoomPage.jsx";
import ReviewPage from "./common/ReviewPage/ReviewPage.jsx";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage />}></Route>
          <Route path="/home" element={<HomePage />}></Route>
          <Route path="/dashboard" element={<DashboardPage/>}></Route>
          <Route path="*" element={<StartPage />}></Route>
          <Route path="/rooms" element={<RoomPage/>}></Route>
          <Route path="/reviews" element={<ReviewPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
