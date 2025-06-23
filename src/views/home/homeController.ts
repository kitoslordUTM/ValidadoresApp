import { useEffect, useState } from 'react';
import { useSolicitud } from '../../hooks/useClients';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Customer } from '../../models/User';


export function useHomeController() {
  const initialDate = useSelector((state: RootState) => state.Filter.startDate);
  const endDate = useSelector((state: RootState) => state.Filter.endDate);
  const category = useSelector((state: RootState) => state.Filter.category);
  const status = useSelector((state: RootState) => state.Filter.status);

  const [filteredDataSource, setFilteredDataSource] = useState<Customer[]>([]);
  const [filtro, setFiltro] = useState('');
  const [list, setList] = useState<Customer[]>([]);

  const formatDate = (date: string) => {
  const [day, month, year] = date.split('/');
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

  const { handleSolicitud , isLoading} = useSolicitud();

  useEffect(() => {
    loadSolicitudes();
  }, [status, initialDate, endDate, category]);

 const loadSolicitudes = async () => {
  try {
    const response = await handleSolicitud({
      estatus: status,
      fecha1: formatDate(initialDate),
      fecha2: formatDate(endDate),
      moto: 'Todos',
      tipo: category,
    });

    if (response && response.data?.items) {
      const items = response.data.items;
      setList(items);
      setFilteredDataSource(items);
    } else {
      console.warn('Respuesta vacía o sin items:', response);
      setList([]);
      setFilteredDataSource([]);
    }
  } catch (error) {
    console.error('Error al cargar solicitudes:', error);
  }
};


  const searchFilterFunction = (text: string) => {
    if (text) {
      const filtered = list.filter(item => {
        const nombres = item.nombres?.toUpperCase() || '';
        const app = item.app?.toUpperCase() || '';
        const apm = item.apm?.toUpperCase() || '';
        const textData = text.toUpperCase();

        return (
          nombres.includes(textData) ||
          app.includes(textData) ||
          apm.includes(textData)
        );
      });
      setFilteredDataSource(filtered);
      setFiltro(text);
    } else {
      setFilteredDataSource(list);
      setFiltro('');
    }
  };

  return {
    filteredDataSource,
    searchFilterFunction,
    isLoading
  };
}
