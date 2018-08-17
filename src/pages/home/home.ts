import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';


import { CreateBoardPage } from '../create-board/create-board';
import { Http } from '../../../node_modules/@angular/http';
import { ListPage } from '../list/list';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // every 1500 meters 2 zoom levels
  // 1000 meter radius has zoom level 14
  ZOOM_LEVEL = 11;
  RADIUS = 10;
  MAX_DISTANCE_TO_SEARCH = 6//miles
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

  constructor(public navCtrl: NavController, private geolocation: Geolocation, private http: Http, private nativePageTransitions: NativePageTransitions ) {}

  ionViewDidLoad(){
    this.RADIUS = ( 1609.34 * this.MAX_DISTANCE_TO_SEARCH )
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
  goToList() {
    let options: NativeTransitionOptions = {
    direction: 'up',
    duration: 500,
    slowdownfactor: 3,
    slidePixels: 20,
    iosdelay: 100,
    androiddelay: 150,
    fixedPixelsTop: 0,
    fixedPixelsBottom: 60
   };

    this.nativePageTransitions.slide(options);
    this.navCtrl.push(ListPage);
  }


  findBoard(){
    var link = 'http://localhost:800/local-message-board-api/find-board.php';
    var userGeoData = JSON.stringify
    (
      {
        lat: this.user.lat,
        lng: this.user.lng,
        maxDistance: this.MAX_DISTANCE_TO_SEARCH,
      }
    );
  
    this.http.post(link, userGeoData).subscribe(data => {
      try {
        this.closestBoards = JSON.parse(data["_body"]);
      } catch (error) {
        console.log(data);
      }
      
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
