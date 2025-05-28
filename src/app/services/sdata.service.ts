import { Injectable } from '@angular/core';
import { Datuak } from '../interfaces/datuak';
import JSON from '../../assets/Datuak.json';
import { User } from '../interfaces/user';


@Injectable({
  providedIn: 'root'
})

export class SDataService {
  datuak: Datuak = JSON;
  constructor() { }

  // INSERTAR un nuevo usuario
  insert(user: User): void {
    this.datuak.data.push(user);
    this.datuak.total++;
  }

  // ACTUALIZAR usuario por ID
  update(id: number, updatedUser: Partial<User>): void { // Partial hace que sea opcional.
    const index = this.datuak.data.findIndex(user => user.id === id);
    if (index !== -1) {
      this.datuak.data[index] = {
        ...this.datuak.data[index],
        ...updatedUser
      };
    }
  }

  // ELIMINAR usuario por ID
  delete(id: number): void {
    const originalLength = this.datuak.data.length;
    this.datuak.data = this.datuak.data.filter(user => user.id !== id);
    if (this.datuak.data.length < originalLength) {
      this.datuak.total--; // actualizar total si se eliminó alguien
    }
  }

  select(id: number): User | undefined {
    return this.datuak.data.find(user => user.id === id);
  }


}

