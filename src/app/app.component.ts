import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('contentSection') contentSection!: ElementRef;
  @ViewChild('sidebar') sidebar ? : ElementRef;
  @ViewChild('content') content ? : ElementRef;
  menuName!: string;
  menuItems: NodeListOf < Element > ;
  isActive!: false;

  menuList = [{
    id:1,
    name: "Dashboard",
    path:'dashboard',
    isActive: false,
  }, {
    id:2,
    name: "Freelancer",
    path:'freelance',
    isActive: false,
  }, {
    id:3,
    name: "Account",
    path:'account',
    isActive: false,
  }]

  constructor(public router :Router) {
    this.menuItems = document.querySelectorAll("#sidebar ul li");
  }

  selectedMenu(index: number) {
    let path = ""
    this.menuList.forEach((menu, i) => {
      if (i === index) {
        menu.isActive = true;
        this.menuName = menu.name;
        path = menu.path;
      } else {
        menu.isActive = false;
      }
    });

    this.router.navigate([`pages/${path}`]);
  }

  navigateLogin(){
    this.router.navigate([`pages/auth`]);
  }

  onSidebarToggleClick() {
    this.sidebar?.nativeElement.classList.toggle("active");
    this.content?.nativeElement.classList.toggle("active");
  }
}
