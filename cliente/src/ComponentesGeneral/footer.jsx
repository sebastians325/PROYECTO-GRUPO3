import React from "react"
import '../App.css'
import { Link } from 'react-router-dom';

function Pie(){

    return(
        <>
        <footer>
            <ul className='primerfooter'>
                <li id="LaboraPe"><strong>LaboraPe</strong></li>
                <li>© 2025 - 2030</li>
                <li>Privacy - Terms</li>

            </ul>
            <ul className='segundofooter'>
                <li id="Segundotitle"><strong>Cuenta</strong></li>
                <li><Link to="/publicaciones/login">Login</Link></li>
                <li><Link to="/register/cliente">Registro</Link></li>
                <Link to="/register/freelancer">Registro Freelancer</Link>
                <li>Carrito</li>

            </ul>
            <ul className='tercerofooter'>
                <li id="tercerotitle"><strong>Productos</strong></li>
                <li>Mas vendidos</li>
                <li>Nuevos</li>
                <li>Ofertas</li>

            </ul>
            <ul className='cuartofooter'>
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