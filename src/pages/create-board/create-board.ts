import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '../../../node_modules/@angular/http';
import { HomePage } from '../home/home';

/**
 * Generated class for the CreateBoardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-board',
  templateUrl: 'create-board.html',
})
export class CreateBoardPage {
  public user: any = {}
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http) {
    this.user = {
      'lat'     : this.navParams.get('lat'),
      'lng'     : this.navParams.get('lng'),
      'radius'  : this.navParams.get('radius')
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateBoardPage');
    
  }


  createBoard(){
    var link = 'http://localhost:800/local-message-board-api/create-board.php';
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
      console.log(data["_body"]);
    }, error => {
      console.log(error);
    });
  }

}
