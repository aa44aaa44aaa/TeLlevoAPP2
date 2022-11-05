import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-conductor',
  templateUrl: './home-conductor.page.html',
  styleUrls: ['./home-conductor.page.scss'],
})
export class HomeConductorPage implements OnInit {

  cliente: string

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cliente = this.activatedRoute.snapshot.paramMap.get("user")
  }

}
