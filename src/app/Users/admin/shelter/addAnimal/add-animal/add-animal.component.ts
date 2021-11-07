import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-animal',
  templateUrl: './add-animal.component.html',
  styleUrls: ['./add-animal.component.css']
})
export class AddAnimalComponent implements OnInit {
  successMessage: string = " ";
  addAnimal!: FormGroup;
  model!: NgbDateStruct;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.addAnimal = this.fb.group({
      name: ['', [Validators.required, Validators.pattern("[A-Za-zА-Яа-яЁёІіЇїЄє]{2,20}")]],
      ageAnimal: ['', [Validators.required]],
      typeAnimal: ['', [Validators.required]],
      sexAnimal:['', [Validators.required]],
      sterilizationAnimal: ['', [Validators.required]],
      description: ['',[Validators.required] ],
      photoAnimal: ['', [Validators.required]]
    })
  }
  reg() {
    // // @ts-ignore
    // //document.getElementById('add-sport-form').click();
    // this.userService.addUser(this.regForm.value).subscribe(
    //     (response: User) => {
    //       console.log(response);
    //       this.regForm.reset();
    //     },
    //     (error: HttpErrorResponse) => {
    //       alert(error.message);
    //       this.regForm.reset();
    //     }
    // );
    // alert("Ви успішно зареєстровані! Тепер увійдіть до свого акаунту");
    // console.log(this.regForm)
  }
}
