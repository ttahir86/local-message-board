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
  ZOOM_LEVEL = 10;
  RADIUS = 10;
  MAX_DISTANCE_TO_SEARCH = 40 //miles
  public closestBoards: any = [
    {latitude: 40, longitude: -75}
  ]

  public boards: any[] = [];
  


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
    
    

    this.findBoard();
  }




  startBoard() {

    this.navCtrl.push(CreateBoardPage, this.user);
  }


  findBoard(){
    var link = 'http://localhost:80/local-message-board-api/find-board.php';
    var userGeoData = JSON.stringify
    (
      {
        lat: this.user.lat,
        lng: this.user.lng,
        radius: this.user.radius,
        title: "Test Title",
        message: "test message",
        maxDistance: this.MAX_DISTANCE_TO_SEARCH,
      }
    );
  
    this.http.post(link, userGeoData).subscribe(data => {
      this.closestBoards = JSON.parse(data["_body"]);
      for (let i in this.closestBoards ) {
        var lat =  Number(this.closestBoards[i].latitude)
        var lng =  Number(this.closestBoards[i].longitude)
        this.boards.push({latitude:lat, longitude: lng})
     }
    }, error => {
      console.log(error);
    });
  }

}
