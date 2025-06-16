import {useCreditByUserIdQuery} from '../services/clients';
import {adaptCreditResponse} from '../adapters/adaptCreditResponse';
import {useEffect, useState} from 'react';
import {Customer} from '../models/User';

export const useCredit = (id: number) => {
  const [customer, setCustomer] = useState<Customer>({} as Customer);

  const {data, refetch, isLoading} = useCreditByUserIdQuery(id);
  console.log('useCredit', data);

  useEffect(() => {
    if (data) {
      const adapted = adaptCreditResponse(data);
      setCustomer(adapted as Customer);
    }
  }, [data]);

  return {
    data: customer,
    refetch,
    isLoading,
  };
};
