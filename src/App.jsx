import Navbar from "./components/Navbar";
import SweaterDesigner from "./components/sweaterPatren";

function App() {
  return (
    <div className="flex flex-col min-h-screen ">
      <Navbar />
      <main>
        <SweaterDesigner />
      </main>
    </div>
  );
}

export default App;
