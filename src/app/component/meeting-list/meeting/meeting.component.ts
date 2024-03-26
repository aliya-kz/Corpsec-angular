import {Component} from '@angular/core';
import {MeetingResponse} from "../../../model/meeting.model";
import {VenueResponse} from "../../../model/venue.model";
import {CommitteeResponse} from "../../../model/committee.model";
import {VenueService} from "../../../service/venue.service";
import {CommitteeService} from "../../../service/committee.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {MeetingService} from "../../../service/meeting.service";
import {VoteResponse} from "../../../model/vote.model";
import {MemberResponse} from "../../../model/member.model";
import {MemberService} from "../../../service/member.service";
import {VoteService} from "../../../service/vote.service";

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})

export class MeetingComponent {
  meetingId: string | null = "";
  meeting!: MeetingResponse;
  venue: VenueResponse = new VenueResponse();
  members: MemberResponse[] = [];
  votes: VoteResponse[] = [];
  committees: CommitteeResponse[] = [];
  venues: VenueResponse[] = [];

  constructor(
    private venueService: VenueService,
    private committeeService: CommitteeService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private meetingService: MeetingService,
    private memberService: MemberService,
    private voteService: VoteService
  ) {
  }

  ngOnInit(): void {
    this.meetingId = this.route.snapshot.paramMap.get('id');
    this.loadMeeting(this.meetingId);
    this.sortAgendaItems();
    this.loadCommittees();
    this.loadVotes();
    this.loadMembers();
    this.loadVenues();
  }

  loadMeeting(id: string | null): void {
    this.meetingService.getMeetingById(id).subscribe(
      (meeting: MeetingResponse) => {
        this.meeting = meeting;
      },
      (error) => {
        console.error('Error fetching meeting details:', error);
      }
    );

  }

  editMeeting() {
    this.router.navigate(['/meetings', this.meetingId, 'edit']);
  }

  sortAgendaItems(): void {
    if (this.meeting && this.meeting.agendaItemList) {
      this.meeting.agendaItemList.sort((a, b) => +a.number - +b.number);
    }
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

  loadVotes(): void {
    this.voteService.getAllVotes().subscribe(votes => {
      this.votes = votes;
    });
  }

  getVoteName(voteId: string): string {
    const vote = this.votes.find(vote => vote.id === voteId);
    return vote ? vote.name : '';
  }

  loadMembers(): void {
    this.memberService.getAllMembers().subscribe(members => {
      this.members = members;
    });
  }

  getMemberName(memberId: string): string {
    const member = this.members.find(member => member.id === memberId);
    return member ? member.shortName : '';
  }

  loadVenues(): void {
    this.venueService.getAllVenues().subscribe(venues => {
      this.venues = venues;
    });
  }

  getVenue(venueId: string) {
    const venue = this.venues.find(venue => venue.id === venueId);
    return venue ? venue.name : '';
  }
}
