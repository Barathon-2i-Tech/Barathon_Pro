import './App.css';
import Welcome from './Page/Welcome.jsx';
import {Route, Routes} from "react-router-dom"; 


/*<Route path="/register" element={<Register />}></Route>*/

function App() {
    return (
        
        <div className="App">
            <Routes>
                <Route path="/" element={<Welcome />}></Route>
                <Route path="/register" element={<h1>Register Pro</h1>}></Route>
                <Route path="/subscribe" element={<h1>Inscription</h1>}></Route>
            </Routes>
            
        </div>
        
    );
}

export default App;
