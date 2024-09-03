import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import './App.css'

const App = () => {
  return (
    <>
    <Header />
    <main className="grow h-full flex flex-col">
      <Outlet />
    </main>
    <Footer />
    </>
  );
};

export default App;
