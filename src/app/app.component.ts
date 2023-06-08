import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('contentSection') contentSection!: ElementRef;
  @ViewChild('sidebar') sidebar?: ElementRef;
  @ViewChild('content') content?: ElementRef;
  menuName!: string;
  menuItems: NodeListOf < Element > ;
  isActive!: false;
  isLoggedIn: any = false;

  menuList = [{
    id: 1,
    name: "Dashboard",
    path: 'dashboard',
    isActive: false,
    noPath: false
  }, {
    id: 2,
    name: "Freelancer",
    path: 'freelance',
    isActive: false,
    noPath: false
  }, {
    id: 3,
    name: "Account",
    path: 'account',
    isActive: false,

  },
   {
    id: 4,
    name: "Logout",
    path: "pages/auth",
    isActive: false,

  }
]

  constructor(public router: Router, public authService: AuthService) {
    this.menuItems = document.querySelectorAll("#sidebar ul li");
  }

  ngOnInit(): void {
    const isLoggedIn = localStorage.getItem('token')?true : false;
    this.isLoggedIn = isLoggedIn
  }

  selectedMenu(index: number) {
    let path = ""
    this.menuList.forEach((menu, i) => {
      if (i === index) {
        menu.isActive = true;
        this.menuName = menu.name;
        path = menu.path;
        this.router.navigate([`pages/${path}`]);
      } else {
        menu.isActive = false;
      }
    });

    if (index === this.menuList.length - 1) {
      this.authService.logout()
      this.router.navigate([`pages/auth`]);
    }
  }

  navigateLogin() {
    if(this.authService.hasToken()) this.authService.logout()
    this.router.navigate([`pages/auth`]);
  }


  onSidebarToggleClick() {
    this.sidebar?.nativeElement.classList.toggle("active");
    this.content?.nativeElement.classList.toggle("active");
  }
}
