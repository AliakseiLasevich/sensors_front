import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRoles } from 'src/app/core/models/userRoles';
import { AuthStoreFacade } from 'src/app/store/auth-store/auth-store.facade';

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.scss'],
})
export class SensorsComponent implements OnInit {
  isAdmin: boolean = false;
  userRoles$: Observable<string[]>;

  constructor(private authFacade: AuthStoreFacade) {}

  ngOnInit(): void {
    this.userRoles$ = this.authFacade.userRoles$;
    this.userRoles$.subscribe((roles) =>
      roles.includes(UserRoles.admin)
        ? (this.isAdmin = true)
        : (this.isAdmin = false)
    );
  }

}
