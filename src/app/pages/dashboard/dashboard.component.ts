import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/core/http.service';
import { Freelancer } from 'src/app/interface/freelancer.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  activeTabIndex: number = 0;
  freelancers: Freelancer[] = [];

  constructor(public httpService : HttpService){}

  ngOnInit(): void {
    this.getFreelancer()
  }

  getFreelancer(){
    this.httpService.get('/freelancer').subscribe((data:Freelancer[])=> {
      this.freelancers = data;
    })
  }
  setActiveTab(index: number) {
    this.activeTabIndex = index;
  }

}
