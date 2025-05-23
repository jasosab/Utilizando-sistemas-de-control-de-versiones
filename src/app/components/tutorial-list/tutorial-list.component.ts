import { Component, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';


export interface tutorial {
  id:number;
  title: string;
  description: string;
  published: boolean;
}

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css']
})
export class TutorialsListComponent implements OnInit {
  tutorials: tutorial[] = [];;
  currentTutorial= {
    id:0,
    title: '',
    description: '',
    published: false
  };
  currentIndex = -1;
  title = '';
  constructor(private tutorialService: TutorialService) { }
  ngOnInit(): void {
    this.retrieveTutorials();
  }
  retrieveTutorials(): void {
    this.tutorialService.getAll()
      .subscribe(
        data => {
          this.tutorials = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  refreshList(): void {
    this.retrieveTutorials();
    this.currentTutorial = {
      id:0,
      title: '',
      description: '',
      published: false
    };
    this.currentIndex = -1;
  }
  setActiveTutorial(tutorial: tutorial, index: number): void {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }
  removeAllTutorials(): void {
    this.tutorialService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.retrieveTutorials();
        },
        error => {
          console.log(error);
        });
  }
  searchTitle(): void {
    this.tutorialService.findByTitle(this.title)
      .subscribe(
        data => {
          this.tutorials = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}
