import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  activeTabIndex: number = 0;

  setActiveTab(index: number) {
    this.activeTabIndex = index;
  }
}
