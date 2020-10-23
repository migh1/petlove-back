import { Router } from 'express';
import CepController from './controllers/CepController';

const router = Router();

router.get('/cep/:cep', CepController.validate, CepController.index);

export default router;
