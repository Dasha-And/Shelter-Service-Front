import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { Animal } from 'src/app/model/animal';
import { Shelter } from 'src/app/model/shelter';
import { AnimalService } from 'src/app/service/animal.service';

@Component({
  selector: 'app-add-animal',
  templateUrl: './add-animal.component.html',
  styleUrls: ['./add-animal.component.css']
})
export class AddAnimalComponent implements OnInit {
  successMessage: string = " ";
  addAnimal!: FormGroup;
  model!: NgbDateStruct;
  shelterId!: number;
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private animalService : AnimalService) { }

  ngOnInit(): void {
    this.addAnimal = this.fb.group({
      name: ['', [Validators.required, Validators.pattern("[A-Za-zА-Яа-яЁёІіЇїЄє]{2,20}")]],
      dateOfBirth: ['', [Validators.required]],
      species: ['', [Validators.required]],
      gender:['', [Validators.required]],
      sterilized: ['', [Validators.required]],
      description: ['',[Validators.required] ],
      imageUrl: ['', [Validators.required]]
    })
    this.route.queryParams.subscribe(params => {
        const shelterId = params['shelterId'];
        this.shelterId = shelterId;
      });
  }
  add() {
        this.animalService.addAnimal(this.addAnimal.value).subscribe(
          (response: Animal) => {
            console.log(response);
            // this.adminRegForm.reset();
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
            // this.adminRegForm.reset();
          }
        );
    }
}
