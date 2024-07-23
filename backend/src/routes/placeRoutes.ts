import { Router } from 'express';
import { searchPlaces } from '../controllers/placeController';

const placeRoutes = Router();

placeRoutes.get('/api/search', searchPlaces);

export default placeRoutes;
