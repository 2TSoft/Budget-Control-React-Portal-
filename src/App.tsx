import { HashRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import { AuthButton } from './shared/components/AuthButton';

import './App.css';
import Home from './pages/Home';
import PurchaseRequisitionList from './pages/PurchaseRequisitionList';
import BudgetPage from './pages/BudgetPage';
import DepartmentPage from './pages/DepartmentPage';  

function App() {
  return (
    <Router>
      <div className="app">
        <header className="header">
          <div className="header-content">
            <div className="logo-section">
             
              <a href="https://react.dev" target="_blank">
                <img src={reactLogo} alt="React logo" />
              </a>
              <h1>My Power Pages SPA</h1>
            </div>
            <nav className="navigation">
              <NavLink to="/" end>Home</NavLink>
              <NavLink to="/purchase-requisitions">Purchase Requisitions</NavLink>
              <NavLink to="/budget">Budget</NavLink>
              <NavLink to="/department">Department</NavLink>
            </nav>
            <AuthButton />
          </div>
        </header>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/purchase-requisitions" element={<PurchaseRequisitionList />} />
            <Route path="/budget" element={<BudgetPage />} />
            <Route path="/department" element={<DepartmentPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
