import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:4000';
  }

  getSampleImages() {
    return this.http.get(this.url + '/home/images');
  }

  getGalleryImages(userid) {
    let token = localStorage.getItem('token');
    let payload = {
      id: userid,
      token: token
    };
    return this.http.post(this.url + '/users/posts', payload);
  }
}
