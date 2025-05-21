import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import "../css/PaginaProducto.css";
import Cabecera1 from '../ComponentesGeneral/Cabecera1';
//import Pie from '../ComponentesGeneral/Pie';
import { CarritoContext } from '../App';

function PaginaProductoPrincipal() {


    return (
        <>
            
            <Pie />
        </>
    );
}

export default PaginaProductoPrincipal;