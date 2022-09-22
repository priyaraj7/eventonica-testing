// import calendar from "./calendar.png";
import "./App.css";
import Header from "./components/Header";
import Users from "./components/users/Users";
// import Events from "./components/Events";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header />

      <main>
        <div className="user-and-events">
          <Users />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
