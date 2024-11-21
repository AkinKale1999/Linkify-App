import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TablePage from './components/TablePage';
import EditPage from './components/EditPage';
import SlotPropsSignIn from './components/Login';
import DashboardLayoutBasic from "./components/Dashboard.jsx"
import SlotPropsSignUp from './components/Register.jsx';

// asdad

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<TablePage />} />
                <Route path="/edit/:id" element={<EditPage />} />
                <Route path="/Login" element={<SlotPropsSignIn />} />
                <Route path="/Dashboard" element={<DashboardLayoutBasic />} />
                <Route path="/Register" element={<SlotPropsSignUp />} />
            </Routes>
        </Router>
    );
};
export default App;
