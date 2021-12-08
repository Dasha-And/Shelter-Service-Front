import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import { Animal } from 'src/app/model/animal';
import { AnimalService } from 'src/app/service/animal.service';

@Component({
  selector: 'app-edit-animal',
  templateUrl: './edit-animal.component.html',
  styleUrls: ['./edit-animal.component.css']
})
export class EditAnimalComponent implements OnInit {

  successMessage: string = " ";
  editAnimal!: FormGroup;
  model!: NgbDateStruct;
  animal : Animal | undefined;
  shelterId! : number;
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private animalService: AnimalService) { }

  ngOnInit(): void {
    this.editAnimal = this.fb.group({
      id: [],
      name: ['', [Validators.required, Validators.pattern("[A-Za-zА-Яа-яЁёІіЇїЄє]{2,20}")]],
      age: ['', [Validators.required]],
      species: ['', [Validators.required]],
      gender:['', [Validators.required]],
      sterilized: ['', [Validators.required]],
      description: ['',[Validators.required] ],
      imageUrl: ['', [Validators.required]],
      shelterId: []
    })

    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      const shelterId = params['shelterId']
      this.animalService.getAnimalPage(id).subscribe(
        (response : Animal) => {
          console.log(response);
          this.animal = response;
          this.shelterId = shelterId;
        }
      )
    });
  }

  change(): void {
    this.route.queryParams.subscribe(params => {
       console.log(this.editAnimal.value)
      this.animalService.updateAnimal(this.editAnimal.value).subscribe(
        (response: Animal) => {
         
          //console.log(response);
          //this.router.navigate(['/shelter/:shelterId', {queryParams: {shelterId: this.shelterId}}])
          alert("Данные изменены")
        }
      )
    });
  }
}
