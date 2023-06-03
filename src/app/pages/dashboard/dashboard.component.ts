import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/core/http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  activeTabIndex: number = 0;

  constructor(public httpService : HttpService){}

  ngOnInit(): void {
  
  }

  setActiveTab(index: number) {
    this.activeTabIndex = index;
  }

}
