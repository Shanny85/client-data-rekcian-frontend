import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import AuthProvider from "./context/authContext.jsx";

createRoot(document.getElementById('root')).render(
    <AuthProvider> {/* Use AuthProvider instead of authContext */}
        <App />
    </AuthProvider>,
);
