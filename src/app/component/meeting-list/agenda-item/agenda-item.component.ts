import {Component, OnInit} from '@angular/core';
import {AgendaItemService} from '../../../service/agenda-item.service';
import {AgendaItemResponse} from './agenda-item.model';
import {CommitteeService} from "../../../service/committee.service";
import {CommitteeResponse} from "../../../model/committee.model";
import {MeetingResponse} from "../../../model/meeting.model";
import {MeetingService} from "../../../service/meeting.service"; // Import the AgendaItemResponse type
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-agenda-item',
  templateUrl: './agenda-item.component.html',
  styleUrls: ['./agenda-item.component.css']
})
export class AgendaItemComponent implements OnInit {
  committeeId: string = '';
  startDate: string = '2001-01-01';
  endDate: string = new Date().toISOString().slice(0, 10);
  agendaItems: AgendaItemResponse[] = [];
  committees: CommitteeResponse[] = [];
  meetings: MeetingResponse[] = [];

  itemsPerPage: number = 20;
  currentPage: number = 1;
  searchTerm: string = '';

  constructor(private agendaItemService: AgendaItemService, private committeeService: CommitteeService,
              private meetingService: MeetingService) {
  }

  ngOnInit(): void {
    this.loadAgendaItems();
    this.loadCommittees();
    this.loadMeetings();
  }

  loadAgendaItems(): void {
    this.agendaItemService.getAllAgendaItemsByCommitteeIdAndDates(this.committeeId, this.startDate, this.endDate)
    .subscribe(agendaItems => {
      this.agendaItems = agendaItems;
    });
  }

  private loadCommittees() {
    this.committeeService.getAllCommittees().subscribe(committees => {
      this.committees = committees;
    });
  }

  getMeetingNumber(agendaItemResponse: AgendaItemResponse) {
    const meeting = this.meetings.find(m => m.id === agendaItemResponse.meetingId);
    return meeting ? meeting.meetingNumber : 'Meeting number not found';
  }

  getMeetingDate(agendaItemResponse: AgendaItemResponse) {
    const meeting = this.meetings.find(m => m.id === agendaItemResponse.meetingId);
    return meeting ? meeting.startDateTime : 'Meeting date not found';
  }

  loadMeetings(): void {
    // Assuming you have a method in your service to fetch meetings
    this.meetingService.getAllMeetings()
    .subscribe(meetings => {
      this.meetings = meetings;
    });
  }

  downloadExcel(): void {
    const fileName = 'agenda_items.xlsx';
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.agendaItems.map(item => {
      return {
        'Meeting Number': this.getMeetingNumber(item),
        'Meeting Date': this.getMeetingDate(item),
        'Agenda Item Number': item.number,
        'Agenda Item Name': item.name
      };
    }));
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Agenda Items');
    XLSX.writeFile(wb, fileName);
  }

  getPageNumbers(): number[] {
    const totalPages = Math.ceil(this.agendaItems.length / this.itemsPerPage);
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  filterAgendaItems(): void {
    this.agendaItemService.filterAgendaItems(this.committeeId, this.startDate, this.endDate, this.searchTerm)
    .subscribe(items => {
      this.agendaItems = items;
    });
  }

  getPaginatedItems(): AgendaItemResponse[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.agendaItems.slice(startIndex, endIndex);
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }
}
