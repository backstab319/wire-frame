import { Injectable } from '@angular/core';
import { Syllabus } from './syllabus';
import { Subject } from 'rxjs';
import { SubTopics } from './sub-topics';

@Injectable({
  providedIn: 'root'
})
export class SyllabusService {
  // Syllabus
  syllabus: Syllabus[] = [];
  updateSyllabus = new Subject<Syllabus[]>();

  // Subtopics
  subTopic: SubTopics;
  subTopicIndex: number;
  updateSubTopicIndex = new Subject<number>();

  constructor() { }

  // Headings and topics management
  getHeadings = () => {
    return this.syllabus;
  }

  putHeadings = (headingName: String) => {
    this.syllabus.push({
      heading: headingName,
      subHeadings: []
    });

    this.updateSyllabus.next(this.syllabus);
  }

  deleteHeading(index: number) {
    this.syllabus.splice(index, 1);

    this.updateSyllabus.next(this.syllabus);
  }

  updatedSyllabus = () => this.updateSyllabus.asObservable();

  // Subtopics index management
  setSubtopicIndex = (index: number) => {
    this.subTopicIndex = index;
    this.updateSubTopicIndex.next(index);
  }

  updatedSubTopicIndex = () => this.updateSubTopicIndex.asObservable();

  // Subtopics data management
  getSubtopics = () => this.syllabus[this.subTopicIndex].subHeadings;

  putSubtopics = (data: SubTopics) => {
    this.syllabus[this.subTopicIndex].subHeadings.push(data);
  }

  getSubtopicHeading = () => this.syllabus[this.subTopicIndex].heading;

  deleteSubtopic(index: number) {
    this.syllabus[this.subTopicIndex].subHeadings.splice(index, 1);
    this.updateSubTopicIndex.next(this.subTopicIndex);
  }
}
