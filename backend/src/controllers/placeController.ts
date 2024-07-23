import { Request, Response } from 'express';
import PlaceSearchService from '../services/PlaceSearchService/PlaceSearchService';
import AppError from '../errors/AppError';

export const searchPlaces = async (req: Request, res: Response): Promise<Response> => {
  const { keyword } = req.query;

  if (!keyword) {
    throw new AppError('Keyword is required', 400);
  }

  try {
    const results = await PlaceSearchService(keyword as string);
    return res.status(200).json({ results });
  } catch (error) {
    throw new AppError(error.message, 500);
  }
};
