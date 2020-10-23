import request from 'supertest';
import server from '../src/server';

describe('CepController', () => {
  afterEach(() => {
    server.close();
  });

  describe('GET /cep/:cep com parametros invalidos', () => {
    test('parametro vazio', async () => {
      const supertest = await request(server).get('/cep/');

      const expected_response = {};
      const expected_status = 404;

      expect(supertest.status).toBe(expected_status);
      expect(supertest.body).toEqual(expected_response);
    });

    test('parametro < 8 digitos numericos', async () => {
      const supertest1 = await request(server).get('/cep/1234567');
      const supertest2 = await request(server).get('/cep/1234-56');
      const supertest3 = await request(server).get('/cep/1testeste');

      const expected_body = {};
      const expected_status = 400;

      expect(supertest1.status).toBe(expected_status);
      expect(supertest1.body).toEqual(expected_body);

      expect(supertest2.status).toBe(expected_status);
      expect(supertest2.body).toEqual(expected_body);

      expect(supertest3.status).toBe(expected_status);
      expect(supertest3.body).toEqual(expected_body);
    });

    test('parametro > 8 digitos numericos', async () => {
      const supertest1 = await request(server).get('/cep/123456789');
      const supertest2 = await request(server).get('/cep/12345-6789');
      const supertest3 = await request(server).get('/cep/123456789testeste');

      const expected_body = {};
      const expected_status = 400;

      expect(supertest1.status).toBe(expected_status);
      expect(supertest1.body).toEqual(expected_body);

      expect(supertest2.status).toBe(expected_status);
      expect(supertest2.body).toEqual(expected_body);

      expect(supertest3.status).toBe(expected_status);
      expect(supertest3.body).toEqual(expected_body);
    });
  });

  describe('GET /cep/:cep com parametros validos', () => {
    test('parametro = 8 digitos numericos e cep invalido', async () => {
      const supertest1 = await request(server).get('/cep/12345678');
      const supertest2 = await request(server).get('/cep/12345-678');
      const supertest3 = await request(server).get('/cep/12345678teste-ste');

      const expected_body = {};
      const expected_status = 406;

      expect(supertest1.status).toBe(expected_status);
      expect(supertest1.body).toEqual(expected_body);

      expect(supertest2.status).toBe(expected_status);
      expect(supertest2.body).toEqual(expected_body);

      expect(supertest3.status).toBe(expected_status);
      expect(supertest3.body).toEqual(expected_body);
    });

    test('parametro = 8 digitos numericos e cep válido', async () => {
      const supertest1 = await request(server).get('/cep/18460001');
      const supertest2 = await request(server).get('/cep/18460-001');
      const supertest3 = await request(server).get('/cep/18460001testes-te');

      const expected_body = {
        cep: '18460-001',
        localidade: 'Itararé',
        logradouro: 'Rua Campos Salles',
        uf: 'SP',
      };
      const expected_status = 200;

      expect(supertest1.status).toBe(expected_status);
      expect(supertest1.body).toEqual(expected_body);

      expect(supertest2.status).toBe(expected_status);
      expect(supertest2.body).toEqual(expected_body);

      expect(supertest3.status).toBe(expected_status);
      expect(supertest3.body).toEqual(expected_body);
    });

    test('parametro = 8 digitos numericos e cep desconhecido', async () => {
      const supertest1 = await request(server).get('/cep/18460000');
      const supertest2 = await request(server).get('/cep/18460-000');
      const supertest3 = await request(server).get('/cep/18460000testes-te');

      const expected_body = {};
      const expected_status = 406;

      expect(supertest1.status).toBe(expected_status);
      expect(supertest1.body).toEqual(expected_body);

      expect(supertest2.status).toBe(expected_status);
      expect(supertest2.body).toEqual(expected_body);

      expect(supertest3.status).toBe(expected_status);
      expect(supertest3.body).toEqual(expected_body);
    });
  });
});
