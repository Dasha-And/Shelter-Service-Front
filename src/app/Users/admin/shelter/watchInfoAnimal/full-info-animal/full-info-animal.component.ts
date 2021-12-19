import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Animal} from 'src/app/model/animal';
import {AnimalService} from 'src/app/service/animal.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-full-info-animal',
  templateUrl: './full-info-animal.component.html',
  styleUrls: ['./full-info-animal.component.css']
})
export class FullInfoAnimalComponent implements OnInit {

  animal!: Animal;
  sterilized!: string;
  booked: boolean = false
  public days = ['2021-12-20', '2021-12-21', '2021-12-22', '2021-12-23', '2021-12-24', '2021-12-21', '2021-12-22']
  public times = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00']
  constructor(private route: ActivatedRoute, private animalService: AnimalService) {
  }

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
          if (response.status == 'BOOKED') {
            this.booked = true
          }
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    });
  }

  alertConfirmation() {
    Swal.fire({
      title: 'Ви впевнені що хочете забрати тварину?',
      text: 'Цей процес є незворотнім.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Так,впевнен.',
      cancelButtonText: 'Ні,передумав'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Підтвердження',
          'Тварина успішно заброньована.',
          'success'
        )
        this.animal.status = 'BOOKED'
        console.log(this.animal.status)
        this.animalService.updateAnimal(this.animal).subscribe(
          (response : Animal) => {
            console.log(response)
            window.location.reload();
          }
        )

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Відміна',
          'Бронь відмінена',
          'error'
        )
      }
    })
  }
}
