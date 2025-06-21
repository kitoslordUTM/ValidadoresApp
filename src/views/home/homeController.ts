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

  const { handleSolicitud } = useSolicitud();

  useEffect(() => {
    loadSolicitudes();
  }, [status, initialDate, endDate, category]);

 const loadSolicitudes = async () => {
    try {
      const response = await handleSolicitud({
        estatus: status,
        fecha1: initialDate,
        fecha2: endDate,
        moto: 'Todos',
        tipo: category,
      });
      

      const items = response!.data.items || [];
      setList(items); // guardamos todos los datos en estado base
      setFilteredDataSource(items); // también los mostramos por defecto
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
  };
}
