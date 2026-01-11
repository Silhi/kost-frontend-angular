import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KosListComponent } from './features/kos/pages/kos-list/kos-list.component';
import { KosFormComponent } from './features/kos/pages/kos-form/kos-form.component';
import { KosDetailComponent } from './features/kos/pages/kos-detail/kos-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'kos', pathMatch: 'full' },
  { path: 'kos', component: KosListComponent, pathMatch: 'full' },
  { path: 'kos/new', component: KosFormComponent },
  { path: 'kos/:id', component: KosDetailComponent },
  { path: 'kos/:id/edit', component: KosFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}