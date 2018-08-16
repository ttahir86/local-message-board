import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { CreateBoardPage } from '../create-board/create-board';
import { Http } from '../../../node_modules/@angular/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  ZOOM_LEVEL = 12;
  RADIUS = 10;

  public user: any = {}
  public map: any = {
    lat: 5,
    lng: 5,
    zoom: this.ZOOM_LEVEL
  }
  public labelOptions = {
    color: '000000',
    fontFamily: '',
    fontSize: '18px',
    fontWeight: 'bold',
    text: ' ',
  }

  constructor(public navCtrl: NavController, private geolocation: Geolocation, private http: Http ) {}

  ionViewDidLoad(){

    this.getUserLocation();
    
  }


  getUserLocation() {
    //let GPSoptions = {timeout: 100000, enableHighAccuracy: false, maximumAge: 0};
    let GPSoptions = { enableHighAccuracy: true, maximumAge: 0 };
    this.geolocation.getCurrentPosition(GPSoptions)
      .then((position) => {
        this.geolocationCallBack(position)
      })
      .catch((error) => {
        console.log('Error getting location', error);
      },
    );
  }


  geolocationCallBack(pos){
    console.log(pos.coords);
    this.map = {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude,
      zoom: this.ZOOM_LEVEL
    }

    this.user = {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude,
      radius: this.RADIUS
    }
  }




  startBoard() {

    this.navCtrl.push(CreateBoardPage, this.user);
  }


  findBoard(){
    var link = 'http://localhost:80/local-message-board-api/find-board.php';
    console.log(this.user.lat);
    console.log(this.user.lng);
    var userGeoData = JSON.stringify
    (
      {
        lat: this.user.lat,
        lng: this.user.lng,
        radius: this.user.radius,
        title: "Test Title",
        message: "test message"
      }
    );
  
    this.http.post(link, userGeoData).subscribe(data => {
      console.log(JSON.parse(data["_body"]));
    }, error => {
      console.log(error);
    });
  }

}
