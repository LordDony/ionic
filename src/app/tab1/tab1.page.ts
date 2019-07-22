import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../modal/modal.component';
import { ApiService } from '../services/api.service';


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

  constructor(private modal : ModalController, private api : ApiService) {
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

}
