import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile/Profile";

function App() {
   const { currentUser } = useSelector((state) => state.user);
   return (
      <div className="app">
         <div className="blur" style={{ top: "-18%", right: "0" }}></div>
         <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>
         <BrowserRouter>
            <Routes>
               <Route index element={currentUser ? <Home /> : <Auth />} />
               <Route path="/" element={currentUser ? <Home /> : <Auth />} />
               <Route path="/login" element={<Auth />} />
               <Route path={`/profile/:profileId`} element={<Profile />} />
            </Routes>
         </BrowserRouter>
      </div>
   );
}

export default App;
