import { Component } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
  activeTabIndex: number = 0;

  setActiveTab(index: number) {
    this.activeTabIndex = index;
  }
}
