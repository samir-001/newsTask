import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TagsCrudService } from '../../services/tags-crud.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Tag } from 'src/app/core/modals/tag';

@Component({
  selector: 'app-tags-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './tags-form.component.html',
  styleUrls: ['./tags-form.component.scss']
})
export class TagsFormComponent implements OnInit{
  private mode!:string
  private id!:number
  public tag!:FormGroup;
  constructor(private TagsCrud:TagsCrudService,private route:ActivatedRoute,private router:Router){}

  ngOnInit(): void 
  {
    this.getMode()

    this.tag = new FormGroup(
      {
      'id':new FormControl(null),
      'ArTagName' : new FormControl(null,Validators.required),
      'EnTagName' : new FormControl(null,Validators.required),
      'ArTagDescription' : new FormControl(null,Validators.required),
      'EnTagDescription' : new FormControl(null,Validators.required),
    })

    if(this.mode === 'edit-tag')
    {
      this.getIdFromUrl()
      this.fillForm(this.id)
    }
}

onSubmit(){
  if(this.tag.valid)
  {
    switch(this.mode)
    {
      case 'add-tag':
        console.log(123)
        this.TagsCrud.createTag(this.tag.value).subscribe(()=>{
          this.router.navigate(['/tag'])
        });
        break;
        case'edit-tag':
        if(this.id)
        {
          this.TagsCrud.upDateTag(this.id,this.tag.value).subscribe(()=>{
            this.router.navigate(['/tag'])
          });
        }
      }
  }
}
//handle edit mode
getMode()
{
  this.mode = this.route.snapshot.url[0].path
}
getIdFromUrl()
{
  this.id = this.route.snapshot.params['id']
}

fillForm(id:number)
{
  if(this.id){
    this.TagsCrud.getTag(id)
    .subscribe((cat:Tag|null)=> cat ? this.tag.patchValue(cat):null)
  }
}

}

