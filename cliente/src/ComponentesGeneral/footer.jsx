import React from "react"
import '../App.css'
import { Link } from 'react-router-dom';

function Pie(){

    return(
        <>
        <footer>
            <ul className='footer'>
                <li id="LaboraPe"><strong>LaboraPe</strong></li>
                <li>© 2025 - 2030</li>
                <li>Privacy - Terms</li>

            </ul>
            <ul className='footer'>
                <li id="Segundotitle"><strong>Cuenta</strong></li>
                <li><Link to="/publicaciones/login">Login</Link></li>
                <li><Link to="/register/cliente">Registro Cliente</Link></li>
                <Link to="/register/freelancer">Registro Freelancer</Link>
                <li>Carrito</li>

            </ul>
            <ul className='footer'>
                <li id="tercerotitle"><strong>Productos</strong></li>
                <li>Mas vendidos</li>
                <li>Nuevos</li>
                <li>Ofertas</li>

            </ul>
            <ul className='footer'>
                <li id="cuartotitle"><strong>Ayuda</strong></li>
                <li> Acerca de Nosotros</li>
                <li> Politica de Envio</li>
                <li> FAQ </li>

            </ul>
        </footer>
        </>
    )
}
export default Pie