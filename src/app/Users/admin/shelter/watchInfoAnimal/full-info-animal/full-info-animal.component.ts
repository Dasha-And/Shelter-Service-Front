import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Animal} from 'src/app/model/animal';
import {AnimalService} from 'src/app/service/animal.service';
import Swal from 'sweetalert2'
import {Bookings} from "../../../../../model/bookings";
import {connectableObservableDescriptor} from "rxjs/internal/observable/ConnectableObservable";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BookingsService} from "../../../../../service/bookings.service";
import {AnimalVaccination} from "../../../../../model/animalVaccination";
import {AnimalVaccinationService} from "../../../../../service/animalVaccination.service";

@Component({
  selector: 'app-full-info-animal',
  templateUrl: './full-info-animal.component.html',
  styleUrls: ['./full-info-animal.component.css']
})
export class FullInfoAnimalComponent implements OnInit {

  animal!: Animal;
  sterilized!: string;
  booked: boolean = false
  data! : string;
  time! : string;
  addBooking!: FormGroup;
  vaccinations! : AnimalVaccination[]
  public days = ['2021-12-20', '2021-12-21', '2021-12-22', '2021-12-23', '2021-12-24', '2021-12-21', '2021-12-22']
  public times = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00']
  //public times = []
  public freeTimes = []
  constructor(private route: ActivatedRoute, private animalService: AnimalService, private fb: FormBuilder, private bookingsService: BookingsService, private animalVaccinationService: AnimalVaccinationService) {
  }

  ngOnInit(): void {
    this.addBooking = this.fb.group({
      date: ['', [Validators.required]],
      animalId: ['', [Validators.required]],
    })
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
          this.animalVaccinationService.getAnimalVaccinationByAnimal(response.id).subscribe(
            (response : AnimalVaccination[]) => {
              this.vaccinations = response;
          }
          )
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    });
  }

  showTime() {
    var date:string = (<HTMLInputElement>document.getElementById("data")).value;
    this.bookingsService.getBookingsByAnimal(this.animal.id).subscribe(
      (response : Bookings[]) => {
        console.log(date)
        response = response.filter(item => item.date.toString().startsWith(date, 0))
        console.log(response)
        for (let i = 0; i < this.times.length; i++) {
          for (let j = 0; j < response.length; j++) {

            if(response[j].date.toString().indexOf(this.times[i]) >= 0) {
              // @ts-ignore
              this.freeTimes.push(this.times[i])
            }
          }
        }
        console.log(this.freeTimes)
        for (let i = 0; i < this.freeTimes.length; i++) {
          const removeIndex = this.times.findIndex( item => item == this.freeTimes[i] );
          console.log(removeIndex)
          if (removeIndex != -1) {
            this.times.splice( removeIndex, 1);
          }
        }
      }
    )
    this.freeTimes = []
    this.times = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00']
  }
  book() {
    var date:string = (<HTMLInputElement>document.getElementById("data")).value;
    var time:string = (<HTMLInputElement>document.getElementById("time")).value;
    this.data = date;
    this.time = time;
    console.log(date)
    console.log(time)
  }
  bookingConfirmation() {
    Swal.fire({
      title: 'Зарезервуваті цей час?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Так,впевнен.',
      cancelButtonText: 'Ні,передумав'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Підтвердження',
          'Час успішно зарезервовано',
          'success'
        )
        this.bookingsService.addBookings(this.addBooking.value).subscribe(
          (response: Bookings) => {
            console.log(response);
            // this.adminRegForm.reset();
          },
          (error: HttpErrorResponse) => {
            alert(error.error);
            // this.adminRegForm.reset();
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
