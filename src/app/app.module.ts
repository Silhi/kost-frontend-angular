import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

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
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
