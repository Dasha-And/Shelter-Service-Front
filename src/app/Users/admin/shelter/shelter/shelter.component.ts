import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Animal } from 'src/app/model/animal';
import { AnimalService } from 'src/app/service/animal.service';

@Component({
  selector: 'app-shelter',
  templateUrl: './shelter.component.html',
  styleUrls: ['./shelter.component.css']
})
export class ShelterComponent implements OnInit {

  animals!: Animal[];
  constructor(private route: ActivatedRoute, private router: Router, private animalService : AnimalService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const shelterId = params['shelterId'];
      this.animalService.getAnimalsByShelter(shelterId).subscribe((response : Animal[]) => {
        this.animals = response;
        console.log(response)
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      });

    });
  }

}
