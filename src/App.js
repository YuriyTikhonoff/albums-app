import "./App.scss";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import LoginPage from "./Components/LoginPage/LoginPage";
import AlbumDetailPage from "./Components/AlbumsDetailPage/AlbumDetailPage";
import AlbumsList from "./Components/AlbumsList/AlbumsList";
import Header from "./Components/Header/Header";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Route path="/login" component={LoginPage} exact />
        <Route path="/albums" component={AlbumsList} exact />
        <Route path="/albums/:albumId" component={AlbumDetailPage} exact />
        <Redirect to="/login" />
      </div>
    </Router>
  );
}

export default App;
