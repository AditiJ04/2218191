import ShortenForm from "./components/ShortenForm";
import StatsPage from "./components/StatsPage";

function App() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>URL Shortener</h1>
      <ShortenForm />
      <hr />
      <StatsPage />
    </div>
  );
}

export default App;
