import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public map: any = {};
  public labelOptions = {
    color: 'red',
    fontFamily: '',
    fontSize: '18px',
    fontWeight: 'bold',
    text: ' ',
  }

  constructor(public navCtrl: NavController) {
    this.map = {
      lat: 40.283927299999995,
      lng: -74.7044311,
      zoom: 10
    }
  }

  ionViewDidLoad()
  {
    
  }

}
