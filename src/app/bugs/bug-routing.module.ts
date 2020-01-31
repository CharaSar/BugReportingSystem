import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BugListComponent } from './bug-list/bug-list.component';
import { BugCreateEditComponent } from './bug-create-edit/bug-create-edit.component';


const bugRoutes: Routes = [
  { path: 'bug-list', component: BugListComponent },
  { path: 'create', component: BugCreateEditComponent },
  { path: 'edit/:id', component: BugCreateEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(bugRoutes)],
  exports: [RouterModule]
})
export class BugRoutingModule { }
