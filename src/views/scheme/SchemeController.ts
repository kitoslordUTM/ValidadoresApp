import {useState} from 'react';
import {useCredit} from '../../hooks/useCredit';
import {Customer} from '../../models/User';

export function useScheme(customer: Customer) {
  const [activeTab, setActiveTab] = useState<'info' | 'galery' | 'credit' | 'interview'>('info');
  const {data: FullData, refetch, isLoading} = useCredit(customer?.id || 1);

  const handleTabChange = (tab: typeof activeTab) => {
    setActiveTab(tab);
  };

  return {
    activeTab,
    FullData,
    isLoading,
    handleTabChange,
  };
}
