import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AgendaItemResponse} from '../model/agenda-item.model';
import {LanguageService} from "./language.service";
import {AGENDA_ITEMS_URI, DEFAULT_LANGUAGE} from "../app.constants"; // Import the AgendaItemResponse type

@Injectable({
  providedIn: 'root'
})
export class AgendaItemService {
  private apiUrl = AGENDA_ITEMS_URI;
  private language: string = DEFAULT_LANGUAGE;

  constructor(private http: HttpClient, private languageService: LanguageService) {
    this.languageService.languageChanged.subscribe((language: string) => {
      this.language = language;
    });
  }

  private getRequestOptionsWithParams(params?: HttpParams): { headers: HttpHeaders; params?: HttpParams } {
    const headers = new HttpHeaders().set('Accept-Language', this.language);
    return { headers, params };
  }

  getAllAgendaItemsByCommitteeIdAndDates(committeeId: string, startDate: string, endDate: string): Observable<AgendaItemResponse[]> {
    const params = new HttpParams()
    .set('startDate', startDate)
    .set('endDate', endDate);
    const requestOptions = this.getRequestOptionsWithParams(params);
    return this.http.get<AgendaItemResponse[]>(`${this.apiUrl}/${committeeId}/filter-by-date`, requestOptions);
  }

  filterAgendaItems(committeeId: string, startDate: string, endDate: string, searchTerm: string): Observable<AgendaItemResponse[]> {
    const params = new HttpParams()
    .set('searchTerm', searchTerm)
    .set('startDate', startDate)
    .set('endDate', endDate);
    const requestOptions = this.getRequestOptionsWithParams(params);
    return this.http.get<AgendaItemResponse[]>(`${this.apiUrl}/${committeeId}/filter`, requestOptions);
  }
}
