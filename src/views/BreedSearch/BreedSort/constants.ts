/* eslint-disable import/prefer-default-export */
import { Sort } from '@ducks/breeds/types';

export const SORT_OPTIONS = [
  { value: Sort.NameAsc.toString(), label: 'Name Asc' },
  { value: Sort.NameDesc.toString(), label: 'Name Desc' },
  { value: Sort.IntelligenceAsc.toString(), label: 'Intelligence Asc' },
  { value: Sort.IntelligenceDesc.toString(), label: 'Intelligence Desc' },
  { value: Sort.EnergyAsc.toString(), label: 'Energy Level Asc' },
  { value: Sort.EnergyDesc.toString(), label: 'Energy Level Desc' },
];
