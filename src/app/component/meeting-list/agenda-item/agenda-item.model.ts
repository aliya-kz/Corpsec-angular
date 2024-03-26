import {Voting} from "../../../model/voting.model";

export class AgendaItemResponse {
  id: string = "";
  number: number = 0;
  name: string  = "";
  decision: string  = "";
  meetingId: string = "";
  votingSet: Voting[] = [];
}

export class AgendaItemRequest {
  id: string  = "";
  number: number = 0;
  name: string  = "";
  decision: string  = "";
  meetingId: string | null  = "";
  votingSet: Voting[] =[];
}
