import {Component} from '@angular/core';
import {MeetingRequest} from '../../../model/meeting.model';
import {MeetingService} from "../../../service/meeting.service";
import {VenueResponse} from "../../../model/venue.model";
import {CommitteeResponse} from "../../../model/committee.model";
import {ActivatedRoute} from "@angular/router";
import {VenueService} from "../../../service/venue.service";
import {CommitteeService} from "../../../service/committee.service";
import {AgendaItemRequest} from "../agenda-item/agenda-item.model";
import {Location} from "@angular/common";
import {VoteResponse} from "../../../model/vote.model";
import {VoteService} from "../../../service/vote.service";
import {MemberService} from "../../../service/member.service";
import {MemberResponse} from "../../../model/member.model";
import {Voting} from "../../../model/voting.model";

@Component({
  selector: 'app-edit-meeting',
  templateUrl: './edit-meeting.component.html',
  styleUrls: ['./edit-meeting.component.css']
})
export class EditMeetingComponent {
  meetingId: string | null = "";
  meetingRequest: MeetingRequest = new MeetingRequest();
  venues: VenueResponse[] = [];
  newAgendaItem: AgendaItemRequest = new AgendaItemRequest();
  committees: CommitteeResponse[] = [];
  votes: VoteResponse[] = [];
  members: MemberResponse[] = [];

  constructor(
    private venueService: VenueService,
    private committeeService: CommitteeService,
    private route: ActivatedRoute,
    private location: Location,
    private meetingService: MeetingService,
    private voteService: VoteService,
    private memberService: MemberService
  ) {
  }

  ngOnInit(): void {
    this.meetingId = this.route.snapshot.paramMap.get('id');
    this.loadMembers();
    this.loadMeetingDetails(this.meetingId);
    this.loadVenues();
    this.loadCommittees();
    this.loadVenues();
    this.loadVotes();
    this.newAgendaItem.number= this.meetingRequest.agendaItemList.length + 1;
  }

  loadMeetingDetails(id: string | null): void {
    this.meetingService.getMeetingById(id).subscribe(
      (meeting: MeetingRequest) => {
        this.meetingRequest = meeting;
      },
      (error) => {
        console.error('Error fetching meeting details:', error);
      }
    );
    this.meetingRequest.agendaItemList.sort((a, b) => a.number - b.number);
  }

  updateMeeting(): void {
    if (this.meetingRequest) {
      this.meetingService.updateMeeting(this.meetingId, this.meetingRequest).subscribe(
        updatedMember => {
          console.log('Meeting updated successfully');
        },
        error => {
          console.log('Error updating meeting: ' + error.message);
        });
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

  loadVenues(): void {
    this.venueService.getAllVenues().subscribe(venues => {
      this.venues = venues;
    });
  }

  getVenue(venueId: string) {
    const venue = this.venues.find(venue => venue.id === venueId);
    return venue ? venue.name : '';
  }

  addAgendaItem() {
    console.log("start adding");
    this.newAgendaItem.meetingId = this.meetingId;
    this.newAgendaItem.id = '';
    this.meetingService.addAgendaItem(this.meetingId, this.newAgendaItem)
    .subscribe(
      (response) => {
        console.log("Agenda item added successfully:", response);
        // Handle any further logic after successful addition
      },
      (error) => {
        console.error("Error adding agenda item:", error);
        // Handle error cases
      }
    );
    console.log(this.meetingId + " " + this.newAgendaItem.decision);
    console.log("added");
    this.newAgendaItem = new AgendaItemRequest();
  }

  getMemberName(memberId: string): string {
    const member = this.members.find(member => member.id === memberId);
    return member ? member.shortName : '';
  }

  private loadVotes() {
    this.voteService.getAllVotes().subscribe(votes => {
      this.votes = votes;
    });
  }

  private loadMembers() {
    this.memberService.getAllMembers().subscribe(members => {
      this.members = members;
    });
  }

  addVoting(member: any, event: any) {
    const voteId = (event.target as HTMLSelectElement).value;
    if (!this.newAgendaItem.votingSet) {
      this.newAgendaItem.votingSet = [];
    }
    const existingIndex = this.newAgendaItem.votingSet.findIndex(voting => voting.memberId === member.id);
    if (existingIndex !== -1) {
      this.newAgendaItem.votingSet[existingIndex].voteId = voteId;
    } else {
      this.newAgendaItem.votingSet.push({
        memberId: member.id,
        voteId: voteId,
        id: '',
        agendaItemId: ''
      });
    }
  }

  deleteAgendaItem(agendaItemId: string) {
    this.meetingService.deleteAgendaItem(agendaItemId)
    .subscribe(
      (response) => {
        console.log("Agenda item deleted successfully:", response);
        // Handle any further logic after successful addition
      },
      (error) => {
        console.error("Error deleting agenda item:", error);
        // Handle error cases
      }
    );
  }
}
