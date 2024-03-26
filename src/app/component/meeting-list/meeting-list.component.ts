import {MeetingService} from '../../service/meeting.service';
import {VenueService} from '../../service/venue.service';
import {CommitteeService} from '../../service/committee.service';
import {MeetingRequest, MeetingResponse} from '../../model/meeting.model';
import {Component, OnInit} from "@angular/core";
import {VenueResponse} from "../../model/venue.model";
import {CommitteeResponse} from "../../model/committee.model";
import {Router} from "@angular/router";
import {MeetingSortCriteria} from "../../model/meeting-sort-criteria.model";

@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.css']
})
export class MeetingListComponent implements OnInit {
  meetings: MeetingResponse[] = [];
  meetingRequest: MeetingRequest = new MeetingRequest();
  venues: VenueResponse[] = [];
  committees: CommitteeResponse[] = [];
  startDateFilter: string | undefined;
  endDateFilter: string | undefined;
  committeeFilter: string | null = null;
  selectedCommitteeId: string = '';
  filtersApplied: boolean = false;
  selectedSortCriteria: MeetingSortCriteria = MeetingSortCriteria.CommitteeId;
  SortCriteria = MeetingSortCriteria;

  constructor(
    private router: Router,
    private meetingService: MeetingService,
    private venueService: VenueService,
    private committeeService: CommitteeService
  ) {
  }

  ngOnInit(): void {
    this.loadMeetings();
    this.loadVenues();
    this.loadCommittees();
  }

  loadMeetings(): void {
    this.meetingService.getAllMeetings().subscribe(meetings => {
      this.meetings = meetings.map(meeting => ({...meeting, showAgendaItems: false}));
    });
  }

  loadVenues(): void {
    this.venueService.getAllVenues().subscribe(venues => {
      this.venues = venues;
    });
  }

  loadCommittees(): void {
    this.committeeService.getAllCommittees().subscribe(committees => {
      this.committees = committees;
    });
  }

  getCommitteeName(committeeId: string): string {
    const committee = this.committees.find(committee => committee.id === committeeId);
    return committee ? committee.shortName : '';
  }

  createMeeting(): void {
    this.meetingService.createMeeting(this.meetingRequest)
    .subscribe();
    this.loadMeetings();
  }

  viewMeeting(id: string): void {
    this.router.navigate(['/meetings', id]);
  }

  applyFilters(): void {
    this.meetings = this.meetings.filter(meeting => {
      let startDateCheck = true;
      let endDateCheck = true;
      let committeeCheck = true;

      if (this.startDateFilter) {
        startDateCheck = meeting.startDateTime > this.startDateFilter;
      }

      if (this.endDateFilter) {
        endDateCheck = meeting.endDateTime < this.endDateFilter;
      }

      if (this.committeeFilter) {
        committeeCheck = meeting.committeeId === this.committeeFilter;
      }

      return startDateCheck && endDateCheck && committeeCheck;
    });
    this.filtersApplied = true;
  }


  sortMeetings(criteria: MeetingSortCriteria): void {
    this.meetings.sort((a, b) => {
      if (a[criteria] < b[criteria]) return -1;
      if (a[criteria] > b[criteria]) return 1;
      return 0;
    });
  }

  resetFilters(): void {
    this.loadMeetings();
    this.startDateFilter = '';
    this.endDateFilter = '';
    this.selectedCommitteeId = '';
    this.filtersApplied = false;
  }
}
