 import { Customer } from "../models/User";

export const Base   =  'http://192.168.2.150:3000'  
export const TIMEOUT = 80000;

export type SolicitudRequest = {
  usuario?: string;
  estatus: string | number;
  fecha1: string;
  fecha2: string;
  sucursal?: string;
  moto: string;
  tipo: string | number;
  permiso?: number;
};



export type SolicitudResponse = {
  data: {
    items: Customer[];
  };
  status: boolean;
  message: string;
};
export type SolicitudResponse2 = {
  data: {
    item: Customer;
  };
  status: boolean;
  message: string;
};

export type SurveyRequest = {
    television: number,
    horno: number,
    refri: number,
    aire:  number,
    estereo: number,
    lavadora: number,
    casa: number,
    depen: number,
    per_viv: number,
    id: number,
    usuario: string,
    calif: number,
    cal_ap: number
}

export type SurveyResponse = {
    message: string,
    succes: boolean 
}