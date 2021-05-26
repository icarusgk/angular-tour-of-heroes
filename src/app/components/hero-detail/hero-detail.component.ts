import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../heroes/hero';
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { HeroService } from "../../services/hero.service";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  // Input to the custom html tag
  @Input() hero?: Hero;

  // Inject the ActivatedRoute, HeroService and Location to the constructor
  constructor(
    private route: ActivatedRoute,  // Holds information about the route
    private heroService: HeroService, // Gets data from the remote server
    private location: Location // Angular Service for interacting with the browser
  ) { }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    // route.snapshot is a static image of the route
    // paramMap is a dictionary of route parameter values, 'id' is inside there
    // Number is a JS built in function which converts the string returned
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack())
    }
  }

  ngOnInit(): void {
    this.getHero();
  }

}
