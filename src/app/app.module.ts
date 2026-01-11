import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KosListComponent } from './features/kos/pages/kos-list/kos-list.component';
import { KosFormComponent } from './features/kos/pages/kos-form/kos-form.component';
import { KosDetailComponent } from './features/kos/pages/kos-detail/kos-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    KosListComponent,
    KosFormComponent,
    KosDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
