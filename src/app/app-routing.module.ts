import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobsComponent } from './components/jobs/jobs.component';

const routes: Routes = [
  {
    path: 'jobs-page',
    component: JobsComponent,
  },
  { path: '', redirectTo: 'jobs-page', pathMatch: 'full' },
  { path: '**', redirectTo: 'jobs-page', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
