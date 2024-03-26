import {CommitteeResponse} from "../../../model/committee.model";
import {CommitteeService} from "../../../service/committee.service";
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {MemberResponse} from "../../../model/member.model";
import {MemberService} from "../../../service/member.service";
import {CommitteeMemberRequest} from "../../../model/committee-member.model";


@Component({
  selector: 'app-committee',
  templateUrl: './committee.component.html',
  styleUrls: ['./committee.component.css']
})
export class CommitteeComponent implements OnInit {
  committeeId: string = "";
  committee!: CommitteeResponse;
  activeMembers: MemberResponse[] = [];
  showOldMembers = false;
  filteredCommitteeMembers: CommitteeMemberRequest[] = [];
  allCommitteeMembers: CommitteeMemberRequest[] = [];

  selectedMember: CommitteeMemberRequest = {
    id: '',
    memberId: '',
    memberName: '',
    startDate: '',
    endDate: '',
    chair: 'false',
    gsmElectionMinutesNumber: ''
  };

  constructor(
    private route: ActivatedRoute,
    private memberService: MemberService,
    private committeeService: CommitteeService
  ) {
  }

  ngOnInit(): void {
    this.loadActiveMembers();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) {
        this.committeeId = id;
        this.getCommitteeDetails(this.committeeId);
      } else {
        console.error('Error, id = null');
      }
    });
  }

  loadActiveMembers(): void {
    this.memberService.getAllActiveMembers().subscribe(members => {
      this.activeMembers = members;
    });
  }

  getCommitteeDetails(id: string): void {
    this.committeeService.getCommitteeById(id).subscribe(committee => {
      this.committee = committee;
      this.allCommitteeMembers = committee.committeeMembers;
      this.filterCommitteeMembers();
    });
  }

  addCommitteeMember(): void {
    this.committeeService.addCommitteeMember(this.committeeId, this.selectedMember).subscribe(() => {
      console.log('Committee member added successfully');
    }, error => {
      console.error('Error adding committee-member', error);
    });
    ;
    this.resetForm();
  }

  resetForm(): void {
    this.selectedMember = new CommitteeMemberRequest();
  }

  updateCommittee(): void {
    this.committeeService.updateCommittee(this.committeeId, this.committee).subscribe(() => {
      console.log('Committee updated successfully');
    }, error => {
      console.error('Error updating committee:', error);
    });
  this.getCommitteeDetails(this.committeeId);
  }

  private filterCommitteeMembers() {
    if (this.showOldMembers) {
      this.filteredCommitteeMembers = this.allCommitteeMembers;
    } else {
      const currentDate = new Date().toISOString().split('T')[0];
      this.filteredCommitteeMembers = this.allCommitteeMembers.filter(member => {
        return member.startDate <= currentDate && member.endDate >= currentDate;
      });
    }
  }

  toggleShowAllMembers(): void {
    this.showOldMembers = !this.showOldMembers;
    this.filterCommitteeMembers();
  }
}
