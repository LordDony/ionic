import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  rForm: FormGroup;
  post: any;
  name: string = '';
  email: string = '';
  age: string = '';

  

  constructor(private modalCtrl: ModalController, private fb: FormBuilder) { 
    this.rForm = fb.group({
      'name': [null, Validators.required],
      'email': [null, Validators.required],
      'age': [null, Validators.required],
      'validate': ''
    });
  }
  addPost(post){
    console.log(this.rForm.value);
    this.modalCtrl.dismiss(this.rForm.value);
  
  }

  ngOnInit() {}

  dismissModal(){
    this.modalCtrl.dismiss({

      'dismissed': true

    });
  }

}
