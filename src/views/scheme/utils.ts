import { Customer } from "../../models/User"
import { RouteProp } from '@react-navigation/native';

export type schemeProps = {
    Customer? : Customer
}

export type SchemeRouteParams = {
  Customer: Customer;
};

export type SchemeProps = {
  route?: RouteProp<{ params: SchemeRouteParams }, 'params'>;
};
