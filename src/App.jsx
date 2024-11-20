import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TablePage from './components/TablePage';
import EditPage from './components/EditPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<TablePage />} />
                <Route path="/edit/:id" element={<EditPage />} />
            </Routes>
        </Router>
    );
};

export default App;
