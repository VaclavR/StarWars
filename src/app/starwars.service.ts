import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Injectable()

export class StarwarsService {

  people = [];
  pages = [];
  http: Http;
  signal = new Subject<void>();
  numberOfPages: number;

  constructor(http: Http) {
    this.http = http;
  }

  fetchData(page) {
    this.http.get('https://swapi.co/api/people/?page=' + page)
    .map((response: Response) => {
      const data = response.json();
      const numberOfPages = Math.ceil(data.count / (Math.ceil(data.results.length / 10) * 10));
      const extractedPeople = data.results;
      const people = extractedPeople.map((human) => {
        return { name: human.name, height: human.height, mass: human.mass, gender: human.gender};
      });
      return [people, numberOfPages];
    })
    .subscribe((data) => {
      this.people = data[0];
      this.numberOfPages = data[1];
      this.signal.next();
    });
  }

  showPeople() {
    return this.people.slice();
  }

  passPages() {
    for (let i = 1; i <= this.numberOfPages; i++) {
      this.pages[i - 1] = i;
    }
    return this.pages;
  }

}
