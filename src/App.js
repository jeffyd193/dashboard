
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Dashboard from './Components/dashboard';
import Footer from './Components/footer';
import Login from './pages/login';

import Analytics from './pages/analytics';
import Projects from './pages/projects';
import Calendar from './pages/calendar';
import Reports from './pages/reports';
import Gmail from './pages/gmail';
import Team from './pages/team';
import Home from './pages/home';
import Test from './pages/test';


function App() {

  const loggedIn = true;

  return (
    <div className="App">
      {!loggedIn ? (
        <Login />
       ) : (
        <Router>
          <Dashboard >
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route path='/Analytics' element={<Analytics />} />
              <Route path='/Projects' element={<Test />} />
              <Route path='/Calendar' element={<Calendar/>} />
              <Route path='/Reports' element={<Reports/>} />
              <Route path='/Gmail' element={<Gmail/>} />
              <Route path='/Team' element={<Team/>} />
            </Routes>
            <Footer />
          </Dashboard>
        </Router>
       )};
    </div>
  );
}

export default App;
