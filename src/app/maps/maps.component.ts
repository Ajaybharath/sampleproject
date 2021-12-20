import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
  @ViewChild('map') gmap: any;
  mapContainer: google.maps.Map;
  marker: google.maps.Marker;
  constructor() { }

  ngOnInit() {
    debugger
    var lat = "17.4330175";// this._commanService.getDefaultLat();
    var lon = "78.3728449";// this._commanService.getDefaultLng();
    var centerLatLng = new google.maps.LatLng(Number(lat), Number(lon));
    this.mapContainer = new google.maps.Map(this.gmap.nativeElement,
      {
        center: centerLatLng,
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        gestureHandling: 'greedy'
      }
    );
    this.marker = new google.maps.Marker({ position: centerLatLng, map: this.mapContainer });
  }
}
