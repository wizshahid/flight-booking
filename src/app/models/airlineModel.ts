import { InventoryDetails } from './airlineInventory';
import { AirlineStatus } from './enums/enums';

export interface AirlineModel {
  id: string;
  name: string;
  contactNo: string;
  contactAddress: string;
  status: AirlineStatus;
  file: any;
}

export interface AirlineDetails extends AirlineModel {
  logoPath: string;
  inventories: InventoryDetails[];
}
