import { Component, ViewChild, ElementRef,NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from "@ionic-native/geolocation";
import { AcademyProvider } from 'my-module-aahh';
import {
  LoadingController,
  AlertController,
  ToastController,
  Platform,
  MenuController } from "ionic-angular";
import { _appIdRandomProviderFactory } from '@angular/core/src/application_tokens';
//import {MapsProvider} from '../../providers/maps/maps'
//import {MapsProvider} from '../../providers/maps/maps'
declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  map:any;
  @ViewChild("map") mapElement: ElementRef;
  @ViewChild("from") origenElement: ElementRef;
  @ViewChild("to") destinoElement: ElementRef;
  @ViewChild("gr") grElement: ElementRef;
  @ViewChild("pe") peElement: ElementRef;
  @ViewChild("mo") moElement: ElementRef;
  

  constructor(public navCtrl: NavController, public _mp:AcademyProvider,
     public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public platform: Platform) {
      console.log("constructor");
   // _ap.Test();
    

    

  }

  loadMaps() {
    console.log("loadMaps");
    
    if (!!google) {
      this.initMap();
    } else {
      this.errorAlert(
        "Error",
        "Something went wrong with the Internet Connection. Please check your Internet."
      );
    }
  }
  errorAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      enableBackdropDismiss:false,
      message: message,
      buttons: [
        {
          text: "OK",
          handler: data => {
            this.loadMaps();
          }
        }
      ]
    });
    alert.present();
  }
  ionViewWillEnter() {
    console.log("ionViewWillEnter");

   
    this.platform.ready().then(() => {
    
      this.loadMaps();
                  


      })
 

  }
   initMap() {
     
    console.log("initMap");

   // infoWindow = new google.maps.InfoWindow;
  
  
   

    var mapEle = this.mapElement.nativeElement;
    this.map = new google.maps.Map(mapEle, {
      zoom: 15,
      center: { lat: -33.437626, lng: -70.651209 },
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoomControl: true,
      scaleControl: true
    });
    let position="RIGHT_CENTER";
   this._mp.createCenter(this.map,google);
    this._mp.createDrawingTool(this.map,google);
    this._mp.cargarLocations(google);
    this._mp.cargarGrifos(google);
    //this._mp.getCurrentPosition(google,this.map);
   
  //  this._mp.buildColorPalette(google);
  }

  calcularRuta(){
console.log("home-calcularruta");

console.log("calcularRuta-from=",this.origenElement.nativeElement.value);
console.log("calcularRuta-to=",this.destinoElement.nativeElement.value);
console.log("calcularRuta-grifos=",this.grElement.nativeElement.checked);
console.log("calcularRuta-peajes=",this.peElement.nativeElement.checked);
let origen=this.origenElement.nativeElement.value;
let destino=this.destinoElement.nativeElement.value;
let showGrifos:boolean=this.grElement.nativeElement.checked;
let showPeajes=this.peElement.nativeElement.checked
let modelo=parseFloat(this.moElement.nativeElement.value);
this._mp.calcRoute(origen,destino,google,this.map,showPeajes,showGrifos);

  }
  
}
