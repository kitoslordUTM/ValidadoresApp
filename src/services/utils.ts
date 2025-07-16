import { Customer } from "../models/User";

{/* prueba  s mzfinan.dyndns.org:448 */}

export const Base   = 'https://mzfinan.dyndns.org:448'  


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
    cal_ap: number,


}

export type SurveyResponse = {
    message: string,
    succes: boolean 
}

export type SurveyRequest2 = {
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
    cal_ap: number,
    
    ingreso_mensual: number,
    comp_ingreso_adic: number,
    ing_mensual_adic: number,
    antiguedad_ine: number,
    calf_referencias: number,
    comp_ingreso: number 
}