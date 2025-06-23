import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter, Routes, Route, MemoryRouter } from 'react-router-dom';
import DashboardCliente from './DashboardCliente';
import { ClienteService } from '../../services/ClienteService';

// Mock ClienteService
jest.mock('../../services/ClienteService', () => ({
    ClienteService: {
        fetchPublicaciones: jest.fn(),
        fetchPostulantes: jest.fn(),
        cambiarEstadoPublicacion: jest.fn(),
        enviarReseña: jest.fn(),
        aceptarPostulante: jest.fn()
    }
}));

// Mock data
const mockUser = {
    id: 1,
    nombre: "Test Cliente",
    apellido: "Apellido",
    role: "cliente",
    correo: "cliente@test.com"
};

const mockPublicacion = {
    id: 1,
    titulo: "Proyecto Test",
    descripcion: "Descripción del proyecto",
    estado: "abierto",
    pago: 1000,
    clienteId: 1
};

describe('DashboardCliente Modal Tests - Happy Path', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        
        // Setup localStorage
        Storage.prototype.getItem = jest.fn((key) => {
            if (key === 'user') return JSON.stringify(mockUser);
            if (key === 'token') return 'fake-token';
            return null;
        });

        // Setup service mocks
        ClienteService.fetchPublicaciones.mockResolvedValue([mockPublicacion]);
        ClienteService.fetchPostulantes.mockResolvedValue([]);
    });

    test('should open review modal when publication status changes to closed', async () => {
        // PREPARAR
        render(
            <MemoryRouter initialEntries={[`/cliente/${mockUser.id}`]}>
                <Routes>
                    <Route path="/cliente/:id" element={<DashboardCliente />} />
                </Routes>
            </MemoryRouter>
        );

        // Esperar a que los datos se carguen y la publicación aparezca
        await waitFor(() => {
            expect(ClienteService.fetchPublicaciones).toHaveBeenCalledWith(mockUser.id);
        });

        // Verificar que la publicación se muestra
        expect(screen.getByText('Proyecto Test')).toBeInTheDocument();

        // EJECUTAR
        const estadoSelect = screen.getByLabelText(/Cambiar estado:/);
        fireEvent.change(estadoSelect, { target: { value: 'cerrado' } });

        // VALIDAR
        expect(screen.getByText('Deja una Reseña')).toBeInTheDocument();
    });
});