import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserWithStoredToken } from "./store/user/thunks";
import { Routes, Route } from "react-router-dom";
import { Navigation, MessageBox } from "./components";
import { Login, SignUp } from "./pages";
import "bootstrap/dist/css/bootstrap.min.css";
import OfferRidePage from "./pages/OfferRidePage";
import FindRidePage from "./pages/FindRidePage";
import RideDetailsPage from "./pages/RideDetailsPage";
import Footer from "./components/Footer";
// import HomePage from "./pages/HomePage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div>
      <Navigation />
      <MessageBox />
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/rides" element={<FindRidePage />} />
        <Route path="/rides/:id" element={<RideDetailsPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/offerride" element={<OfferRidePage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
