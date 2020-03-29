import { Component, OnInit } from '@angular/core';
import { SyllabusService } from '../syllabus.service';
import { Syllabus } from '../syllabus';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  syllabus: Syllabus[] = [];
  subtopics: any;

  constructor(
    public sService: SyllabusService,
    public snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.syllabus = this.sService.getHeadings();
    this.sService.updatedSyllabus().subscribe(val => {
      this.syllabus = val;
    });
  }

  syllabusName: string = '';

  putHeading = () => {
    if (!this.syllabusName) {
      this.alertSnackBar('Please enter the syllabus name');
      return;
    }
    this.sService.putHeadings(this.syllabusName);
    this.alertSnackBar(this.syllabusName + ' added!')
    this.syllabusName = '';
  }

  alertSnackBar(message: string) {
    this.snack.open(message, null, {
      duration: 2000
    });
  }

  del(index: number) {
    this.sService.deleteHeading(index);
  }

  showDetailOf(index: number) {
    this.sService.setSubtopicIndex(index);
  }

}
