import { Component, OnInit } from '@angular/core';
import { DataService } from '../_collaborators/data.service';
import { AuthService } from '../_collaborators/auth.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  imageArray;
  id;
  constructor(private dataService: DataService, private authService: AuthService) {
    this.authService.loginState.subscribe(el => {
      this.id = el.id;
    });
  }

  ngOnInit() {
    this.imageArray = [];
    this.dataService.getGalleryImages(1).subscribe((output: []) => {
      output.forEach(element => {
        console.log(element['content']);
        this.imageArray.push(element['content']);
      });
    });
  }
}
