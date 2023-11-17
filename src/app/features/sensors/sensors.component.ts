import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { UserRoles } from 'src/app/core/models/userRoles';
import { AuthStoreFacade } from 'src/app/store/auth-store/auth-store.facade';
import { SensorFormComponent } from '../sensor-form/sensor-form.component';

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.scss'],
})
export class SensorsComponent implements OnInit, OnDestroy {
  isAdmin: boolean = false;
  userRoles$: Observable<string[]>;
  subscriptions: Subscription[] = [];

  constructor(private authFacade: AuthStoreFacade, private dialog: MatDialog) {}

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

  openSensorForm(): void {
    this.dialog.open(SensorFormComponent, {
      data: { sensor: null },
    });
  }
}
