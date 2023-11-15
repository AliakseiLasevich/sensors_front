import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [NotFoundComponent, HeaderComponent],
  imports: [CommonModule, MaterialModule],
  exports: [HeaderComponent]
})
export class SharedModule {}
