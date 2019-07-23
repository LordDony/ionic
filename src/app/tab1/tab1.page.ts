import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../modal/modal.component';
import { ApiService } from '../services/api.service';
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  myArray : any = [
    {
      name : 'Dony',
      email : 'dony@gmail.com',
      age : 22,
      //color : 'success'
    },
    {
      name : 'Gora',
      email : 'gora@gmail.com',
      age : 17,
      //color : 'tertiary'
    }
  ];

  constructor(private modal : ModalController, private api : ApiService,
     public actionSheetController: ActionSheetController,
     public alertController: AlertController) {
    let data = {
      name : 'John',
      email : 'johnwick@gmail.com',
      age : 38,
      //color : 'danger'
    };
    this.myArray.push(data);

    this.api.getAll().subscribe(response =>{
        console.log(response);
    } )
  }

  calculateAgeColor(age:number){
    console.log('Age', age);
    if(age <= 18){
      return 'danger';
    }else if(age >= 18 && age <= 30){
      return 'success';
    }else if(age >30){
      return 'tertiary';
    }

  }

  edit(){
    let body ={
      name : 'Juan',
      email : 'juan@gmail.com',
      age : 23
    };

    this.api.update(2,body).subscribe(response =>{
      console.log(response);
    })
  }

  delete(){
    this.api.delete(2).subscribe(response => {
      console.log(response);
    })
  }

  async presentModal() {
    const modal = await this.modal.create({
      component: ModalComponent
    });

    modal.onDidDismiss().then((data)=>{
      console.log(data)
      console.log(data.data)
      this.api.create(data.data).subscribe(response => {
        console.log(response);
      })
      this.myArray.push(data.data);
    
    });

    

    return await modal.present();
  }
  async presentActionSheet(name) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Options',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        handler: () => {
          console.log('Delete clicked');
          //alert(name);
          this.presentAlertConfirm();
        }
      }, {
        text: 'Edit',
        handler: () => {
          console.log('Favorite clicked');
          this.presentAlertPrompt();
        }
      }, {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
//ion-alert
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlertMultipleButtons() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['Cancel', 'Open Modal', 'Delete']
    });

    await alert.present();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Are you sure?',
      //message: 'Message <strong>text</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Edit',
      inputs: [
        {
          name: 'name1',
          type: 'text',
          placeholder: 'Name'
        },
        {
          name: 'name2',
          type: 'email',
          placeholder: 'Email'
        },
        {
          name: 'name1',
          type: 'number',
          placeholder: 'Age'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertRadio() {
    const alert = await this.alertController.create({
      header: 'Radio',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: 'Radio 1',
          value: 'value1',
          checked: true
        },
        {
          name: 'radio2',
          type: 'radio',
          label: 'Radio 2',
          value: 'value2'
        },
        {
          name: 'radio3',
          type: 'radio',
          label: 'Radio 3',
          value: 'value3'
        },
        {
          name: 'radio4',
          type: 'radio',
          label: 'Radio 4',
          value: 'value4'
        },
        {
          name: 'radio5',
          type: 'radio',
          label: 'Radio 5',
          value: 'value5'
        },
        {
          name: 'radio6',
          type: 'radio',
          label: 'Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 ',
          value: 'value6'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertCheckbox() {
    const alert = await this.alertController.create({
      header: 'Checkbox',
      inputs: [
        {
          name: 'checkbox1',
          type: 'checkbox',
          label: 'Checkbox 1',
          value: 'value1',
          checked: true
        },

        {
          name: 'checkbox2',
          type: 'checkbox',
          label: 'Checkbox 2',
          value: 'value2'
        },

        {
          name: 'checkbox3',
          type: 'checkbox',
          label: 'Checkbox 3',
          value: 'value3'
        },

        {
          name: 'checkbox4',
          type: 'checkbox',
          label: 'Checkbox 4',
          value: 'value4'
        },

        {
          name: 'checkbox5',
          type: 'checkbox',
          label: 'Checkbox 5',
          value: 'value5'
        },

        {
          name: 'checkbox6',
          type: 'checkbox',
          label: 'Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6',
          value: 'value6'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

}
