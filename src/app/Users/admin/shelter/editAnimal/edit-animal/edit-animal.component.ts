import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-edit-animal',
  templateUrl: './edit-animal.component.html',
  styleUrls: ['./edit-animal.component.css']
})
export class EditAnimalComponent implements OnInit {

  successMessage: string = " ";
  editAnimal!: FormGroup;
  model!: NgbDateStruct;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.editAnimal = this.fb.group({
      name: ['', [Validators.required, Validators.pattern("[A-Za-zА-Яа-яЁёІіЇїЄє]{2,20}")]],
      ageAnimal: ['', [Validators.required]],
      typeAnimal: ['', [Validators.required]],
      sexAnimal:['', [Validators.required]],
      sterilizationAnimal: ['', [Validators.required]],
      description: ['',[Validators.required] ],
      photoAnimal: ['', [Validators.required]]
    })
  }
}
