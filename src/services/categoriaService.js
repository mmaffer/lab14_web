import api from './api';

const CATEGORIA_URL = '/api/categorias';

export const categoriaService = {
  getAll: async () => {
    const response = await api.get(CATEGORIA_URL);
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`${CATEGORIA_URL}/${id}`);
    return response.data;
  },

  create: async (categoria) => {
    const response = await api.post(CATEGORIA_URL, categoria);
    return response.data;
  },

  update: async (id, categoria) => {
    const response = await api.put(`${CATEGORIA_URL}/${id}`, categoria);
    return response.data;
  },

  delete: async (id) => {
    await api.delete(`${CATEGORIA_URL}/${id}`);
  }
};