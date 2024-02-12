import {Link, Routes, Route, BrowserRouter} from 'react-router-dom';
import ShowCuenta from './components/ShowCuenta';
import './App.css'
import  ShowMovimiento  from './components/ShowMovimiento';

let vacio = '';

function App() {

  const abrir_cerrar_menu = () => {
    let menu_desplegable = document.getElementById('menu');
    let boton_cerrar = document.getElementById('x');
    menu_desplegable.classList.toggle('abrir_menu');
    boton_cerrar.classList.toggle('colocar_x');
  };
  return (
  <BrowserRouter>
    <div>
      <header>
      <div className='barras'>
      <button onClick ={abrir_cerrar_menu} className='boton_menu' id='x'></button>
      </div>
      <nav id='menu' className='desplegable'>
      <ul>
      <li><Link to='/Cuentas'>Cuentas</Link></li>
      <li><a href='/Movimientos'>Movimientos</a></li>
      <li><a href={vacio}>Graficos</a></li>
      </ul>
      </nav>
      </header>

    
    <Routes>
    <Route path='/Cuentas' element={<ShowCuenta></ShowCuenta>}></Route>
    <Route path='/Movimientos' element={<ShowMovimiento></ShowMovimiento>}></Route>
    </Routes>
   
    </div>
     </BrowserRouter>
  )
}

export default App;
