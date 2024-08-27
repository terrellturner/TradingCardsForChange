import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
    <Header />
    <main className="grow h-full flex flex-col"><Homepage /></main>
    <Footer />
    </>
  );
};

export default App;
