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

  async presentActionSheet(item) {
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
          this.presentAlertPrompt(item)
          
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

  async presentAlertPrompt(item) {
    const alert = await this.alertController.create({
      header: 'Edit',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Name',
          value: item.name

        },
        {
          name: 'email',
          type: 'email',
          placeholder: 'Email',
          value : item.email
        },
        {
          name: 'age',
          type: 'number',
          placeholder: 'Age',
          value : item.age

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
          text: 'Save',
          handler: () => {
            console.log('Confirm Ok');
            
          }
        }
      ]
    });

    await alert.present();
  }
}
