import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MemberService} from "../../../service/member.service";
import {MemberResponse} from "../../../model/member.model";

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent {
  memberId: string = "";
  member!: MemberResponse; // Define type based on your Member model
  updateStatusMessage: string = "";

  constructor(
    private route: ActivatedRoute,
    private memberService: MemberService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) {
        this.memberId = id;
        this.getMemberDetails(this.memberId);
      } else {
        // Handle the case where 'id' is null
      }
    });
  }

  getMemberDetails(id: string): void {
    this.memberService.getMemberById(id).subscribe(member => {
      this.member = member;
    });
  }

  updateMember(): void {
    if (this.member) {
      const memberRequest: { endDate: string; ined: boolean; fullName: string; id: string; shortName: string; startDate: string } = {
        id: this.member.id,
        fullName: this.member.fullName,
        shortName: this.member.shortName,
        startDate: this.member.startDate,
        endDate: this.member.endDate,
        ined: this.member.ined
      };

      this.memberService.updateMember(memberRequest.id, memberRequest).subscribe(
        updatedMember => {
          this.updateStatusMessage = 'Member updated successfully';
        },
        error => {
          this.updateStatusMessage = 'Error updating member: ' + error.message;
        });
    }
  }
}
