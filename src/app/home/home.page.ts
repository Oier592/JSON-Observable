import { Component, OnInit } from '@angular/core';
import { Datuak } from '../interfaces/datuak';
import { SDataService } from '../services/sdata.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})


export class HomePage implements OnInit {
  datuak!: Datuak;

  // Variables para Input.
  id_Input!: number;
  email_Input!: string;
  first_name_Input!: string;
  last_name_Input!: string;
  avatar_Input!: string;
  // Variables para Input.

  constructor(private sDataService: SDataService, private alertController: AlertController) { }

  ngOnInit() {
    this.datuak = this.sDataService.datuak;
  }

  // Funciones planas, pulsar botón y ya.
  Insert() {
    this.sDataService.insert({
      id: 99,
      email: 'nuevo@ejemplo.com',
      first_name: 'Nuevo',
      last_name: 'Usuario',
      avatar: 'https://via.placeholder.com/150'
    });
  }

  Update() {
    this.sDataService.update(7, {
      first_name: 'Miguel',
      last_name: 'Actualizado'
    });
  }

  Delete() {
    this.sDataService.delete(8);
  }
  Select() {
  }
  // Funciones planas, pulsar botón y ya.

  // Funciones Alertas.
  async Insert_Alerta() {
    const alert = await this.alertController.create({
      header: 'Insertar nuevo usuario',
      inputs: [
        { name: 'id', placeholder: 'ID', type: 'number' },
        { name: 'first_name', placeholder: 'Nombre', type: 'text' },
        { name: 'last_name', placeholder: 'Apellido', type: 'text' },
        { name: 'email', placeholder: 'Correo', type: 'email' },
        { name: 'avatar', placeholder: 'URL Avatar', type: 'url' },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Insertar',
          handler: (data) => {
            this.sDataService.insert({
              id: +data.id,
              first_name: data.first_name,
              last_name: data.last_name,
              email: data.email,
              avatar: data.avatar,
            });
          },
        },
      ],
    });

    await alert.present();
  }
  async Update_Alerta() {
    const alert = await this.alertController.create({
      header: 'Actualizar usuario',
      inputs: [
        { name: 'id', placeholder: 'ID a actualizar', type: 'number' },
        { name: 'first_name', placeholder: 'Nuevo nombre', type: 'text' },
        { name: 'last_name', placeholder: 'Nuevo apellido', type: 'text' },
        { name: 'email', placeholder: 'Nuevo correo', type: 'email' },
        { name: 'avatar', placeholder: 'Nueva URL Avatar', type: 'url' },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Actualizar',
          handler: (data) => {
            this.sDataService.update(+data.id, {
              first_name: data.first_name,
              last_name: data.last_name,
              email: data.email,
              avatar: data.avatar,
            });
          },
        },
      ],
    });

    await alert.present();
  }
  async Delete_Alerta() {
    const alert = await this.alertController.create({
      header: 'Eliminar usuario',
      inputs: [
        { name: 'id', placeholder: 'ID del usuario a eliminar', type: 'number' },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: (data) => {
            this.sDataService.delete(+data.id);
          },
        },
      ],
    });

    await alert.present();
  }
  async Select_Alerta() {
    const alert = await this.alertController.create({
      header: 'Buscar usuario por ID',
      inputs: [
        { name: 'id', placeholder: 'ID a buscar', type: 'number' },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Buscar',
          handler: (data) => {
            const result = this.sDataService.select(+data.id);
            console.log('Resultado de la búsqueda:', result);
            this.alertController.create({
              header: 'Resultado',
              message: result
                ? `Nombre: ${result.first_name} ${result.last_name}<br>Email: ${result.email}`
                : 'Usuario no encontrado',
              buttons: ['OK'],
            }).then(a => a.present());
          },
        },
      ],
    });

    await alert.present();
  }
  // Funciones Alertas.

  // Funciones con campos.
  Insert_Campo() {
    this.sDataService.insert({
      id: this.id_Input,
      email: this.email_Input,
      first_name: this.first_name_Input,
      last_name: this.last_name_Input,
      avatar: this.avatar_Input
    });
  }

  Update_Campo() {
    this.sDataService.update(this.id_Input, {
      email: this.email_Input,
      first_name: this.first_name_Input,
      last_name: this.last_name_Input,
      avatar: this.avatar_Input
    });
  }

  Delete_Campo() {
    this.sDataService.delete(this.id_Input);
  }

  Select_Campo() {
    const user = this.sDataService.select(this.id_Input);
    if (user) {
      this.email_Input = user.email;
      this.first_name_Input = user.first_name;
      this.last_name_Input = user.last_name;
      this.avatar_Input = user.avatar;
    } else {
      // Si no se encuentra, puedes limpiar o mostrar un mensaje
      this.email_Input = '';
      this.first_name_Input = '';
      this.last_name_Input = '';
      this.avatar_Input = '';
      console.warn('Usuario no encontrado');
    }
  }


  // Funciones con campos.
}

