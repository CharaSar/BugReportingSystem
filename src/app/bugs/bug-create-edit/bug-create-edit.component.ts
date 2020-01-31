import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray} from '@angular/forms';
import { Bug } from '../../models/bug-model';
import { BugService } from '../bug.service';
import { Router, ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'brs-bug-create-edit',
  templateUrl: './bug-create-edit.component.html',
  styleUrls: ['./bug-create-edit.component.scss']
})
export class BugCreateEditComponent implements OnInit {
  bugForm :FormGroup;
  commentForm : FormArray;
  bug: Bug;
  id = this.route.snapshot.paramMap.get('id');
  title="edit";
  show: boolean = true;

  constructor(private route: ActivatedRoute,private bugService:BugService, private formBuilder: FormBuilder,private router: Router) { 

    this.bugForm = this.formBuilder.group({
      title: ['',[Validators.required]],
      description: ['',[Validators.required]],
      priority: ['',[Validators.required]],
      reporter: ['',[Validators.required]],
      status: ['',[Validators.required]],
      comments: this.formBuilder.array([])
    });
  }

  ngOnInit() {
    if(this.id!=null){
      this.title = "Edit Form";
      this.updateForm();
    }else{
      this.show = !this.show;
      this.title = "Create Form";
    }
  }


  updateForm(){
    this.bugService.getBug(this.id).subscribe((data) => {
      if(data){
        this.bugForm.patchValue({...data, 
          title:data.title || '',
          description:data.description || '',
          priority: (data.priority || '').toString(),
          reporter: data.reporter || '',
          status: data.status || '',
          comments: data.comments || ''
        });
      }

      const commentForm = this.bugForm.get('comments') as FormArray;
      if(data.comments) {
        data.comments.forEach(comment=>{
          if(comment.description || comment.reporter){
              commentForm.push(this.createComment(comment))
          }
        })
      }     
    })
  }

  submitForm(){
    const actionToInvoke = this.id
      ? this.bugService.editBug(this.id,this.bugForm.value)
      : this.bugService.createBug(this.bugForm.value); 

    actionToInvoke.pipe(
      tap(() => this.router.navigateByUrl('/bug-list'))
    ).subscribe();
        
}

createComment(comment?):FormGroup{
  return this.formBuilder.group({
    description: [comment && comment.description],
    reporter: [comment && comment.reporter]
  });
}

addComment(): void {
  this.commentForm = this.bugForm.get('comments') as FormArray;
  this.commentForm.push(this.createComment());
}

  clearForm(){
    this.bugForm.reset();
  }

}
