import type { QueryFilter } from '@ducks/types';

export type Breed = {
  id: string;
  name: string;
  lowerName: string;
  intelligence: number;
  energyLevel: number;
  description?: string;
  imageUrl?: string;
};

export type ApiBreedRequest = {
  page?: number;
  limit?: number;
};

export type ApiBreed = {
  id: string;
  name: string;
  intelligence: number;
  energy_level: number;
  description?: string;
  image?: {
    url: string;
  };
};

export type ApiBreedResponse = ApiBreed[];

export enum Sort {
  NameAsc = 'NameAsc',
  NameDesc = 'NameDesc',
  IntelligenceAsc = 'IntelligenceAsc',
  IntelligenceDesc = 'IntelligenceDesc',
  EnergyAsc = 'EnergyAsc',
  EnergyDesc = 'EnergyDesc',
}

export type BreedFilters = QueryFilter;

export default {
  BREEDS_FETCH: 'BREEDS_FETCH',
  BREEDS_FETCH_SUCCESS: 'BREEDS_FETCH_SUCCESS',
  BREEDS_FETCH_ERROR: 'BREEDS_FETCH_ERROR',
} as const;
