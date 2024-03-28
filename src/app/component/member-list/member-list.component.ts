import {Component, OnInit} from '@angular/core';
import {MemberService} from '../../service/member.service';
import {MemberRequest, MemberResponse} from '../../model/member.model';
import {Router} from "@angular/router";
import {SortCriteria} from "../../model/member-list.model";
import {STATUS_MESSAGES} from "../../app.constants";


@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})

export class MemberListComponent implements OnInit {
  members: MemberResponse[] = [];
  startDateFilter: string | undefined;
  endDateFilter: string | undefined;
  INEDFilter: string | undefined;
  filtersApplied: boolean = false;
  memberCreationStatusMessage: string = "";
  selectedSortCriteria: SortCriteria = SortCriteria.FullName;
  SortCriteria = SortCriteria;
  newMember: MemberRequest = new MemberRequest();
  showingHistory = false;

  constructor(private router: Router, private memberService: MemberService) {
  }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(): void {
    this.getActiveMembers();
  }

  getActiveMembers(): void {
    this.memberService.getAllActiveMembers().subscribe(
      members => {
        this.members = members;
      },
      error => {
        console.error(STATUS_MESSAGES.loadMembersError, error);
      }
    );
  }

  goToMembersHistory(): void {
    this.memberService.getAllMembers().subscribe(members => {
      this.members = members;
    });
  }

  viewMemberDetails(id: string): void {
    this.router.navigate(['/members', id]);
  }

  createMember(): void {
    this.memberService.createMember(this.newMember).subscribe(
      response => {
        this.memberCreationStatusMessage = STATUS_MESSAGES.memberAddedSuccess;
        this.newMember = new MemberRequest();
      },
      error => {
        this.memberCreationStatusMessage = STATUS_MESSAGES.memberAddedError;
      }
    );
    this.reloadPage();
    this.loadMembers();
  }

  reloadPage() {
    this.router.navigateByUrl('/members', {skipLocationChange: true}).then(() => {
      this.router.navigate([this.router.url]);
    });
  }

  showHistory(): void {
    this.goToMembersHistory();
    this.showingHistory = true;
  }

  backToActiveMembers(): void {
    this.getActiveMembers();
    this.showingHistory = false;
  }

  applyFilters(): void {
    this.members = this.members.filter(member => {
      let startDateCheck = true;
      let endDateCheck = true;
      let INEDCheck = true;

      if (this.startDateFilter) {
        startDateCheck = member.startDate > this.startDateFilter;
      }

      if (this.endDateFilter) {
        endDateCheck = member.endDate < this.endDateFilter;
      }

      if (this.INEDFilter !== undefined) {
        INEDCheck = member.ined === (this.INEDFilter === 'true');
      }

      return startDateCheck && endDateCheck && INEDCheck;
    });
    this.filtersApplied = true;
  }

  resetFilters(): void {
    this.startDateFilter = '';
    this.endDateFilter = '';
    this.INEDFilter = '';
    if (!this.showingHistory) {
      this.getActiveMembers();
    } else {
      this.goToMembersHistory();
    }
    this.filtersApplied = false;
  }

  sortMembers(criteria: SortCriteria): void {
    this.members.sort((a, b) => {
      if (a[criteria] < b[criteria]) return -1;
      if (a[criteria] > b[criteria]) return 1;
      return 0;
    });
  }
}
