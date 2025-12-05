import api from './api';

const PRODUCTO_URL = '/api/productos';

export const productoService = {
  getAll: async () => {
    const response = await api.get(PRODUCTO_URL);
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`${PRODUCTO_URL}/${id}`);
    return response.data;
  },

  create: async (producto) => {
    const response = await api.post(PRODUCTO_URL, producto);
    return response.data;
  },

  delete: async (id) => {
    await api.delete(`${PRODUCTO_URL}/${id}`);
  }
};