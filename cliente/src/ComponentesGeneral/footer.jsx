import React from "react"
import '../App.css'

function Pie(){

    return(
        <>
        <footer>
            <ul className='primerfooter'>
                <li id="LaTienditaDelAbuelo"><strong>LA TIENDITA DEL ABUELO</strong></li>
                <li>© 2010 - 2020</li>
                <li>Privacy - Terms</li>

            </ul>
            <ul className='segundofooter'>
                <li id="Segundotitle"><strong>Cuenta</strong></li>
                <li>Login</li>
                <li>Registro</li>
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