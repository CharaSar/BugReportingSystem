import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BugListComponent } from './bug-list/bug-list.component';
import { MaterialModule } from '../material/material.module';
import { BugCreateEditComponent } from './bug-create-edit/bug-create-edit.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BugRoutingModule } from './bug-routing.module';
import { DeleteDialogComponent } from '../dialog/delete-dialog.component';

@NgModule({
  declarations: [BugListComponent, BugCreateEditComponent,DeleteDialogComponent],
  imports: [CommonModule,MaterialModule,FormsModule,ReactiveFormsModule, BugRoutingModule],
  exports:[BugRoutingModule],
  entryComponents: [DeleteDialogComponent]
})
export class BugModule { }
