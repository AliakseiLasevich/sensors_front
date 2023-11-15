export interface SensorRequestInterface {
  name: string;
  model: string;
  rangeFrom: number;
  rangeTo: number;
  type: string;
  unit: string;
  location: string;
  description: string;
}

export interface SensorResponseInterface {
  id: number;
  name: string;
  model: string;
  rangeFrom: number;
  rangeTo: number;
  type: string;
  unit: string;
  location: string;
  description: string;
}
