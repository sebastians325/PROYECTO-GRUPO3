const { crearEntrada } = require('../decorators/HistorialFactory');

describe('HistorialFactory.crearEntrada', () => {
  // Happy Path: todo correctamente definido
  test('debe crear una entrada con todos los datos', () => {
    const postulacionMock = {
      publicacion: {
        titulo: 'Proyecto 1',
        descripcion: 'Descripción del proyecto',
        pago: 500,
        review: {
          comentario: 'Buen trabajo',
          calificacion: 4,
          cliente: {
            nombre: 'Juan',
            apellido: 'Pérez'
          }
        }
      }
    };

    const entrada = crearEntrada(postulacionMock);
    expect(entrada).toEqual({
      titulo: 'Proyecto 1',
      descripcion: 'Descripción del proyecto',
      pago: 500,
      comentario: 'Buen trabajo',
      calificacion: 4,
      cliente: 'Juan Pérez'
    });
  });

  // Unhappy Path: sin review ni cliente
  test('debe retornar valores nulos y cliente Desconocido si no hay review', () => {
    const postulacionMock = {
      publicacion: {
        titulo: 'Proyecto 2',
        descripcion: 'Otra descripción',
        pago: 1000
      }
    };

    const entrada = crearEntrada(postulacionMock);
    expect(entrada).toEqual({
      titulo: 'Proyecto 2',
      descripcion: 'Otra descripción',
      pago: 1000,
      comentario: null,
      calificacion: null,
      cliente: 'Desconocido'
    });
  });

  // Unhappy Path: review sin cliente
  test('debe retornar cliente Desconocido si no hay datos de cliente', () => {
    const postulacionMock = {
      publicacion: {
        titulo: 'Proyecto 3',
        descripcion: 'Desc 3',
        pago: 800,
        review: {
          comentario: 'Regular',
          calificacion: 3
        }
      }
    };

    const entrada = crearEntrada(postulacionMock);
    expect(entrada).toEqual({
      titulo: 'Proyecto 3',
      descripcion: 'Desc 3',
      pago: 800,
      comentario: 'Regular',
      calificacion: 3,
      cliente: 'Desconocido'
    });
  });
});
