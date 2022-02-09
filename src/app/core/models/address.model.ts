import { Citizen } from './citizen.model';

export class Address {
  constructor(
    public city: string,
    public street: string,
    public houseNumber: number,
    public people: Citizen[],
    public postNumber: string,
    public region?: string
  ) {}
}
