import { Injectable } from '@angular/core';
import { Datuak } from '../interfaces/datuak';
import JSON from '../../assets/Datuak.json';

@Injectable({
  providedIn: 'root'
})

export class SDataService {
  data: Datuak = JSON;
  constructor() { }
}
