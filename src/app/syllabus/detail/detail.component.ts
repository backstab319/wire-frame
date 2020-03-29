import { Component, OnInit } from '@angular/core';
import { SyllabusService } from '../syllabus.service';
import { SubTopics } from '../sub-topics';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  subTopics: SubTopics[];
  subTopicsIndex: number;
  subTopicHeading: String;

  userInput: SubTopics = {
    name: '',
     description: ''
    };

  constructor(
    public sService: SyllabusService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.sService.updateSubTopicIndex.subscribe(val => {
      this.subTopicsIndex = val;
      this.subTopics = this.sService.getSubtopics();
      this.subTopicHeading = this.sService.getSubtopicHeading();
    })
  }

  putSubtopics() {
    // Check if there is a heading to add subtopic to
    if (!this.subTopics) {
      this.warningSnackBar('Please select a heading before adding subtopics');
      return;
    }
    // Check if name and description are empty
    if (!this.userInput.name || !this.userInput.description) {
      this.warningSnackBar('Please check name and description');
      return;
    }
    this.sService.putSubtopics(this.userInput);
    this.userInput = {
      name: '',
      description: ''
    };
  }

  warningSnackBar(warning: string) {
    this.snackBar.open(warning, null, {
      duration: 2000
    });
  }

  deleteSubtopic(index: number) {
    this.sService.deleteSubtopic(index);
  }

}
