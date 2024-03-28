import {AgendaItemRequest, AgendaItemResponse} from './agenda-item.model';

export  class MeetingRequest {
  id: string = "";
  meetingNumber: string = "";
  committeeId: string = "";
  venueId: string = "";
  startDateTime: string = "";
  endDateTime: string = "";
  agendaItemList: AgendaItemRequest[] = [];
}

export class MeetingResponse {
  id: string = "";
  meetingNumber: string = "";
  committeeId: string = "";
  venueId: string = "";
  startDateTime: string = "";
  endDateTime: string = "";
  agendaItemList: AgendaItemResponse[] = [];
}
