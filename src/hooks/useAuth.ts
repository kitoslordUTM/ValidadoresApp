import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { setToken } from '../slices/authSlice';

type DecodedToken = {
  exp: number;
};

export function useAuth() {
  const dispatch = useDispatch();

  const loadToken = async (): Promise<{ valid: boolean; expiresIn?: number }> => {
    try {
      const token = await AsyncStorage.getItem('TOKEN');
      if (!token) return { valid: false };

      const decoded = jwtDecode<DecodedToken>(token);
      const now = Math.floor(Date.now() / 1000);
      const expiresIn = decoded.exp - now;

      if (expiresIn <= 0) {
        await AsyncStorage.removeItem('TOKEN');
        dispatch(setToken(null));
        return { valid: false };
      }

      dispatch(setToken(token));
      return { valid: true, expiresIn };
    } catch {
      await AsyncStorage.removeItem('TOKEN');
      dispatch(setToken(null));
      return { valid: false };
    }
  };

  return { loadToken };
}
