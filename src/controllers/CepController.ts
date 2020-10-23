import { NextFunction, Request, Response } from 'express';
import axios from '../config/axios';

const sanitize_cep = (cep: string) => cep.replace(/\D/g, '');
const validate_cep = (sanitized_cep: string) => sanitized_cep.length === 8;

export default {
  validate(req: Request, res: Response, next: NextFunction) {
    const cep = (req.params.cep as string) || '';

    const sanitized_cep = sanitize_cep(cep);
    const is_valid_cep = validate_cep(sanitized_cep);

    if (is_valid_cep) {
      req.sanitized_cep = sanitized_cep;
      return next();
    }

    return res.status(400).send();
  },
  async index(req: Request, res: Response) {
    const sanitized_cep = req.sanitized_cep;

    try {
      const {
        data: { erro, cep, logradouro, localidade, uf },
      }: any = await axios.get(`/${sanitized_cep}/json/`);

      if (erro) return res.status(406).send();

      const cep_response = {
        cep,
        logradouro,
        localidade,
        uf,
      };

      return res.status(200).json(cep_response);
    } catch (e) {
      console.log(e);
      return res.status(500).send();
    }
  },
};
