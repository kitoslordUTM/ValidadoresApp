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

export type ObjectPicker = {
  label: string,
  value: number,
  id: number 
}

export const InitialValuesPicker = {
  label: '',
  value: 0,
  id: 0
}

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
};

export const casa = [
  {label: 'Sin selección', value: 0, id: 0},
  {label: 'Familiar', value: 1, id: 1},
  {label: 'Propia', value: 0, id: 2},
  {label: 'Rentada', value: 2, id: 3},
];

export const dependientes = [
  {label: 'Sin selección', value: 0, id: 0},
  {label: '1-4', value: 1, id: 1},
  {label: '5', value: 0, id: 2},
  {label: 'Mas de 6', value: -1, id: 3},
];

export const domicilio = [
  {label: 'Sin selección', value: 0, id: 0},
  {label: '1-5', value: 0, id: 1},
  {label: '6 o más', value: -1, id: 2},
];

export const incomeData = [
  {label: 'Sin Selección', value: 0, id: 0},
  {label: 'Recibo de 1 o mas años', value: 2, id: 1},
  {label: 'Edos. Cta bancario', value: 1, id: 2},
  {label: 'Recibo de 6 meses a 1 año', value: 2, id: 3},
  {label: 'Comprobante de ingreso', value: 1, id: 4},
];

export const INE = [
  {label: 'Sin Selección', value: 0, id: 0},
  {label: 'Entre 6 a 12 meses de antigüedad', value: 0, id: 1},
  {label: '1 año de antigüedad', value: 1, id: 2},

  {
    label: '1 año de ant. misma direccion',
    value: 1,
    id: 3,
  },
  {label: 'Otro estado con menos de 6 meses', value: -1, id: 4},
];

export const referencies = [
  {label: 'Sin Selección', value: 0, id: 0},
  {label: 'Buenas referencias', value: 1, id: 1},
  {label: 'Malas referencias', value: -1, id: 2},
  {label: 'Sin comentarios', value: 0, id: 3},
];
