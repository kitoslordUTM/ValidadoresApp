 import {useState} from 'react';
import {useCredit} from '../../hooks/useCredit';
import {Customer} from '../../models/User';

export function useScheme(customer: Customer) {
  const [activeTab, setActiveTab] = useState<string>('info');
  const {data: FullData, refetch, isLoading} = useCredit(customer?.id || 1);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return {
    activeTab,
    FullData,
    isLoading,
    handleTabChange,
  };
}