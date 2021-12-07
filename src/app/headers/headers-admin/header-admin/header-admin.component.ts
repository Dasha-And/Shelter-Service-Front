import { Component, OnInit } from '@angular/core';
import {AnimalService} from "../../../service/animal.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent implements OnInit {

  constructor(private animalService : AnimalService, private router : Router) { }

  ngOnInit(): void {

  }
}
