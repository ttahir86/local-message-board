import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Http } from '@angular/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  ZOOM_LEVEL = 12;
  RADIUS = 10; //mph

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

  constructor(public navCtrl: NavController, private geolocation: Geolocation, private http: Http) {}

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
    console.log(pos.coords);
    this.map = {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude,
      zoom: this.ZOOM_LEVEL
    }

    this.user = {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude,
    }
    
    
  }




  createBoard() {
    // var link = 'http://nikola-breznjak.com/_testings/ionicPHP/api.php';
    var link = 'http://localhost:80/local-message-board-api/api.php';
    var myData = JSON.stringify
    (
      {
        lat: this.user.lat,
        lng: this.user.lng,
        radius: this.RADIUS
      }
    );
    
    
    this.http.post(link, myData).subscribe(data => {
      // this.data.response = data["_body"]; //https://stackoverflow.com/questions/39574305/property-body-does-not-exist-on-type-response
      console.log(data);
    }, error => {
      console.log(error);
    });
  }

}
