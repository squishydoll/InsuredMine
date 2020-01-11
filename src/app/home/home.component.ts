import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { DataService } from '../_collaborators/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  sampleImages;
  username: string;
  logout: boolean;
  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getSampleImages().subscribe(element => {
      this.sampleImages = element;
    });
    this.activatedRoute.queryParamMap.subscribe(qParams => {
      this.username = qParams.get('username');
      this.logout = Boolean(qParams.get('logout'));
    });
  }
}
