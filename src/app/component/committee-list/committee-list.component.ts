import {Component, OnInit} from '@angular/core';
import {CommitteeService} from '../../service/committee.service';
import {MemberService} from '../../service/member.service';
import {MemberResponse} from "../../model/member.model";
import {CommitteeRequest, CommitteeResponse} from "../../model/committee.model";
import {STATUS_MESSAGES} from "../../app.constants";

@Component({
  selector: 'app-committee-list',
  templateUrl: './committee-list.component.html',
  styleUrls: ['./committee-list.component.css']
})
export class CommitteeListComponent implements OnInit {
  committees: CommitteeResponse[] = [];
  activeMembers: MemberResponse[] = [];
  showHistoryButton: boolean = true;
  newCommittee: CommitteeRequest = new CommitteeRequest();
  today: Date = new Date();
  committeeCreationStatusMessage: string = '';

  constructor(private committeeService: CommitteeService, private memberService: MemberService) {
  }

  ngOnInit(): void {
    this.getActiveCommittees();
    this.getActiveMembers();
  }

  getActiveCommittees(): void {
    this.committeeService.getAllActiveCommittees().subscribe(committees => {
      this.committees = committees;
    });
  }

  getActiveMembers(): void {
    this.memberService.getAllActiveMembers().subscribe(members => {
      this.activeMembers = members;
    });
  }

  showHistory(): void {
    this.showHistoryButton = false;
  }

  hideHistory(): void {
    this.getActiveCommittees();
    this.showHistoryButton = true;
  }

  goToCommitteesHistory() {
    this.committeeService.getAllCommittees().subscribe(committees => {
      this.committees = committees;
    });
    this.showHistory();
  }

  createCommittee() {
    this.committeeService.createCommittee(this.newCommittee).subscribe(
      response => {
        this.committeeCreationStatusMessage = STATUS_MESSAGES.committeeAddedSuccess;
      },
      error => {
        this.committeeCreationStatusMessage = STATUS_MESSAGES.committeeAddedError;
      }
    );
    ;
    this.getActiveCommittees();
    this.newCommittee = new CommitteeRequest();

  }

  filterCommitteeMembers(committee: CommitteeResponse) {
    const currentDate = new Date().toISOString().split('T')[0];
    const filteredCommitteeMembers = committee.committeeMembers.filter(member => {
      return member.startDate <= currentDate && member.endDate >= currentDate;
    });
    return filteredCommitteeMembers;
  }
}
