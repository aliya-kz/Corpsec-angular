import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MeetingRequest, MeetingResponse} from '../model/meeting.model';
import {AgendaItemRequest, AgendaItemResponse} from "../component/meeting-list/agenda-item/agenda-item.model";
import {LanguageService} from "./language.service";

@Injectable({
  providedIn: 'root'
})
export class MeetingService {
  private apiUrl = 'http://localhost:8080/meetings';
  private language: string = '';

  constructor(private http: HttpClient, private languageService: LanguageService) {
    this.languageService.languageChanged.subscribe((language: string) => {
      this.language = language;
    });
  }

  private getRequestOptions(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders().set('Accept-Language', this.language)
    };
  }

  getAllMeetings(): Observable<MeetingResponse[]> {
    return this.http.get<MeetingResponse[]>(`${this.apiUrl}`, this.getRequestOptions());
  }

  deleteAgendaItem(agendaItemId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${agendaItemId}`, this.getRequestOptions());
  }

  createMeeting(meetingRequest: MeetingRequest): Observable<MeetingResponse> {
    return this.http.post<MeetingResponse>(`${this.apiUrl}/new`, meetingRequest, this.getRequestOptions());
  }

  addAgendaItem(id: string | null, agendaItemRequest: AgendaItemRequest): Observable<AgendaItemResponse> {
    console.log("enter add ai at service");
    return this.http.post<AgendaItemResponse>(`${this.apiUrl}/${id}`, agendaItemRequest, this.getRequestOptions());
  }

  updateMeeting(id: string | null, meetingRequest: MeetingRequest): Observable<MeetingResponse> {
    return this.http.patch<MeetingResponse>(`${this.apiUrl}/${id}`, meetingRequest, this.getRequestOptions());
  }

  getMeetingById(id: string | null): Observable<MeetingResponse> {
    return this.http.get<MeetingResponse>(`${this.apiUrl}/${id}`, this.getRequestOptions());
  }
}
