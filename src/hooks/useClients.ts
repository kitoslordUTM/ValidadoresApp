import { useSolicitudMutation } from "../services/clients";
import { SolicitudRequest } from "../services/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback } from "react";
 

export const useSolicitud = () => {
    const [solicitud, { isLoading, isError, error }] = useSolicitudMutation();

    const handleSolicitud = useCallback(async (params: Omit<SolicitudRequest, 'usuario' | 'sucursal' | 'permiso'>) => {
        try {
            // Obtener valores de AsyncStorage dentro de la función
            const usuario = await AsyncStorage.getItem('USER') || '';
            const sucursal = await AsyncStorage.getItem('SUCURSAL') || '';
            const permiso = await AsyncStorage.getItem('PERMISO') || '0';

            console.log('Usuario:', usuario);
            console.log('Sucursal:', sucursal);
            console.log('Permiso:', permiso);
            
            const data: SolicitudRequest = {
                ...params,
                usuario,
                sucursal,
                permiso: parseInt(permiso) 
            };

            return await solicitud(data).unwrap();
        } catch (err) {
            throw err;
        }
    }, []);

    return { 
        handleSolicitud, 
        isLoading, 
        isError, 
        error 
    };
};