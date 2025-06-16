import {Customer} from '../../../models/User';

export type informationProps = {
  isLoading?: boolean;
  customer?: Customer;
};

export type creditProps = {
  customer?: Customer;
};

export type galeryProps = {
  customer?: Customer;
};

export type interviewProps = {
  customer?: Customer;
};


export const initialValues = {

    television: 0,
    horno: 0,
    refri: 0,
    aire: 0,
    estereo: 0,
    lavadora: 0,
    casa: 0,
    depen: 0,
    per_viv: 0,
    id: 0,
    usuario: ''

}

export const casa = [
  { label: 'Rentada', value: 0},
  { label: 'Familiar Politico', value: 1},
  { label: 'Familiar Directo', value: 2},
  { label: 'Propia', value: 3}
]

export const dependientes = [
  { label: '0-1', value: 3},
  { label: '2-3', value: 2},
  { label: '3-4', value: 1},
  { label: 'Más de 5', value: 0}
]

export const domicilio = [
   { label: '1-2', value: 3},
  { label: '3-4', value: 2},
  { label: '5-6', value: 1},
  { label: 'Más de 6', value: 0}
]