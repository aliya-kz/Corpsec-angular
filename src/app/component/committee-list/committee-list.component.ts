import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CommitteeService} from '../../service/committee.service';
import {MemberService} from '../../service/member.service';
import {MemberResponse} from "../../model/member.model";
import {CommitteeRequest, CommitteeResponse} from "../../model/committee.model";

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

  constructor(private committeeService: CommitteeService, private memberService: MemberService, private router: Router) {
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

  editCommittee(committeeId: string): void {
    this.router.navigate(['/committees', committeeId]);
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
    this.committeeService.createCommittee(this.newCommittee).subscribe();
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
