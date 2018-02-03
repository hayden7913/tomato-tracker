import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.scss';
import Routes from '../routes';

const App = () =>
    <div>
        <h1>my new change</h1>
        { Routes }
        <footer className="footer">
            <Link to="/">Filterable Table</Link>
            <Link to="/about">About</Link>
        </footer>
    </div>;

export default App;
