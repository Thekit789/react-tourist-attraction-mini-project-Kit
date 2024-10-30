import "./App.css";
import { ArticleSection } from "./components/ArticleSection";
import { Header } from "./components/Header";
import { NavBar } from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Header />
      <NavBar />
      <ArticleSection />
    </div>
  );
}

export default App;
