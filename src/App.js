import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './App.css';
import MakeTask from './components/make_task';
import CatalogPage from './components/CatalogPage';
import TextDetailPage from './components/TextDetailPage';

function App() {
  return (
    <div className="App">
      <Router>
        <AnimationApp />
      </Router>
    </div>
  );
}

function AnimationApp() {
  let location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={300}>
        <Routes location={location}>
          <Route path="/" element={<CatalogPage />} />
          <Route path="/make-task" element={<MakeTask />} />
          <Route path="/text-detail/:index" element={<TextDetailPage />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default App;
