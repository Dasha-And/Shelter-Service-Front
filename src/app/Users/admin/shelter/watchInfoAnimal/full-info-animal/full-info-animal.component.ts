import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Animal } from 'src/app/model/animal';
import { AnimalService } from 'src/app/service/animal.service';

@Component({
  selector: 'app-full-info-animal',
  templateUrl: './full-info-animal.component.html',
  styleUrls: ['./full-info-animal.component.css']
})
export class FullInfoAnimalComponent implements OnInit {

  animal!: Animal;
  sterilized!: string;
  constructor(private route: ActivatedRoute, private animalService: AnimalService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      this.animalService.getAnimalPage(id).subscribe(
        (response: Animal) => {
          console.log(response);
          this.animal = response;
          if (response.sterilized == false) {
            this.sterilized = "Нi"
          } else {
            this.sterilized = "Так"
          }
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    });
  }

}
