// adapters/customerAdapter.ts
import { SolicitudResponse2 } from '../services/clients';
import { Customer } from '../models/User';

export const adaptCreditResponse = (res: SolicitudResponse2 | undefined)=> {

  const adaptedData: Customer | undefined = res?.data?.item;

  return adaptedData
};
