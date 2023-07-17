import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';

const vehicleBrand = [
  { id: 1, brand: 'Chevrolet' },
  { id: 2, brand: 'Suzuki' },
  { id: 3, brand: 'Hyundai' },
  { id: 4, brand: 'Nissan' },
  { id: 5, brand: 'Chery' }
];

const vehicleModel = [
  {id: 1, model: 'Aveo', BrandId:1},
  {id: 2, model: 'Camaro', BrandId:1},
  {id: 3, model: 'Across', BrandId:2},
  {id: 4, model: 'Celerio', BrandId:2},
  {id: 5, model: 'Accent', BrandId:3},
  {id: 6, model: 'Creta', BrandId:3},
  {id: 7, model: 'Versa', BrandId:4},
  {id: 8, model: 'Kicks', BrandId:4},
  {id: 9, model: 'Tiggo 2', BrandId:5},
  {id: 10, model: 'Tiggo 7', BrandId:5},
]

localStorage.setItem('vehicle_brands', JSON.stringify(vehicleBrand));
localStorage.setItem('vehicle_models', JSON.stringify(vehicleModel));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
