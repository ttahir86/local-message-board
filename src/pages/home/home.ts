import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  ZOOM_LEVEL = 15;
  public map: any = {};
  public labelOptions = {
    color: '000000',
    fontFamily: '',
    fontSize: '18px',
    fontWeight: 'bold',
    text: 'tests ',
  }

  constructor(public navCtrl: NavController, private geolocation: Geolocation) {}

  ionViewDidLoad(){
    this.getUserLocation();
  }


  getUserLocation() {
    console.log('getUserLocation() start');
    //let GPSoptions = {timeout: 100000, enableHighAccuracy: false, maximumAge: 0};
    let GPSoptions = { enableHighAccuracy: true, maximumAge: 0 };

    this.geolocation.getCurrentPosition(GPSoptions)
      .then((position) => {
        this.handleResponse(position)
      })
      .catch((error) => {
        console.log('Error getting location', error);
      },

    );
    console.log('getUserLocation() end');

  }


  handleResponse(pos){
    this.map = {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude,
      zoom: this.ZOOM_LEVEL
    }
    
  }

}
