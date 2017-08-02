import { Component, OnInit, OnDestroy } from '@angular/core';
import { StarwarsService } from './../starwars.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

  swService: StarwarsService;
  people = [];
  subscription;
  page = 1;
  pages = [];
  activatedRoute: ActivatedRoute;

  constructor(swService: StarwarsService, activatedRoute: ActivatedRoute) {
    this.swService = swService;
    this.activatedRoute = activatedRoute;
   }

  ngOnInit() {
    this.swService.fetchData(this.page);
    this.subscription = this.swService.signal.subscribe(
      () => {
        this.people = this.swService.showPeople();
        this.pages = this.swService.passPages();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadNextPage() {
    this.page++;
    this.swService.fetchPeople(this.page);
  }
  loadPreviousPage() {
    this.page--;
    this.swService.fetchPeople(this.page);
  }
  jumpOnPage(number) {
    this.page = number;
    this.swService.fetchPeople(this.page);
  }

}
