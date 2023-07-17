import './App.css';
import {Route, Routes, Navigate} from 'react-router-dom';

import Navigation from './components/Navigation/Navigation';
import Form from './pages/Form/Form'
import FormList from './pages/FormList/FormList';

export default function App() {
    return(
        <div className='App'>
            <Navigation/>
            <Routes>
                <Route path='/' element={<Navigate to="/Form"/>} />
                <Route path='/Form' element={<Form/>} />
                <Route path='/FormList' element={<FormList/>}/>
                <Route path='*' element={<Navigate to="/Form"/>} />
            </Routes>
        </div>
    )
}