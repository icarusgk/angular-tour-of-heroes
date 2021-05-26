import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from '../../services/hero.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
// CLASS
export class HeroesComponent implements OnInit {
  // Initialize a value that is not required (?)
  // selectedHero?: Hero;
  // Initialize a value array of type Hero (interface)
  heroes: Hero[] = [];

  constructor(private heroService: HeroService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  // Pass the hero clicked in the template
  // onSelect(hero: Hero): void {
  //   // Assign the hero passed from the 'click' event to the unassigned value of 'selectedHero'
  //   this.selectedHero = hero;
  //   this.messageService.add(`HeroesComponent: Select hero id=${hero.id}`);
  // }

  getHeroes(): void {
    // Call the heroService value passed into the constructor with a type of HeroService
    // Invoke the getHeroes method inside the HeroService class
    this.heroService.getHeroes()
      // Set the local heroes to the heroes returned by the observable
      .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return;}

    this.heroService.addHero({name} as Hero)
      .subscribe(hero=> {
        this.heroes.push(hero);
      })
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h != hero);
    //There's really nothing for the component to do with the Observable
    // returned by heroService.delete() but it must subscribe anyway.
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
