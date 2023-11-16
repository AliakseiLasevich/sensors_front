import { AuthStoreFacade } from 'src/app/store/auth-store/auth-store.facade';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private authFacade: AuthStoreFacade) {}

  isLoggedIn$: Observable<boolean>;

  ngOnInit(): void {
    this.isLoggedIn$ = this.authFacade.loggedIn$;
  }

  logout() {
    this.authFacade.logout();
  }
}
