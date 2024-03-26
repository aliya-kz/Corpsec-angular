import {CommitteeMemberRequest, CommitteeMemberResponse} from "./committee-member.model";

export class CommitteeRequest {
  id: string = "";
  fullName: string = "";
  shortName: string = "";
  startDate: string = "";
  endDate: string = "";
  committeeMembers: CommitteeMemberRequest[] = [];
}

export class CommitteeResponse {
  id: string = "";
  fullName: string = "";
  shortName: string = "";
  startDate: string = "";
  endDate: string = "";
  committeeMembers: CommitteeMemberResponse[] = [];
}
