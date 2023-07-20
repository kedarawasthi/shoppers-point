import { Component, HostListener, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mdbapptwo';
  showHead: boolean = false;
  showFoot: boolean = false;
  showSidenav:boolean=false;
  @ViewChild('sidenav') public sidenav: MatSidenav | undefined;

  constructor(private router: Router,) {

      router.events.forEach((event) => {
        if (event instanceof NavigationStart) {
          if (event['url'] == '/login' || event['url'] == '/checkout') {
            this.showHead = false;
            this.showSidenav=false;
          } else {
            // console.log("NU")
            this.showHead = true;
            this.showSidenav=true;
          }
        }
      });

      router.events.forEach((event) => {
        if (event instanceof NavigationStart) {
          if (event['url'] == '/login') {
            this.showFoot = false;
          } else {
            // console.log("NU")
            this.showFoot = true;
          }
        }
      });
    }

    handleOpenSideNav(sidenav: any) {
      sidenav.open();
      this.sidenav = sidenav;
    }
    handleClose() {
      if (this.sidenav && this.sidenav.opened) {
        this.sidenav.close();
      }
    }


}
