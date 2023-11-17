import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserRoles } from 'src/app/core/models/userRoles';
import { AuthStoreFacade } from 'src/app/store/auth-store/auth-store.facade';

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.scss'],
})
export class SensorsComponent implements OnInit, OnDestroy {
  isAdmin: boolean = false;
  userRoles$: Observable<string[]>;
  subscriptions: Subscription[] = [];

  constructor(private authFacade: AuthStoreFacade) {}

  ngOnInit(): void {
    this.userRoles$ = this.authFacade.userRoles$;
    const rolesSubscription = this.userRoles$.subscribe((roles) =>
      roles.includes(UserRoles.admin)
        ? (this.isAdmin = true)
        : (this.isAdmin = false)
    );
    this.subscriptions.push(rolesSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  addSensor() {
    throw new Error('Method not implemented.');
  }
}
