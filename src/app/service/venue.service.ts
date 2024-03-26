import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { VenueResponse, VenueRequest } from '../model/venue.model';
import {LanguageService} from "./language.service";

@Injectable({
  providedIn: 'root'
})
export class VenueService {
  private apiUrl = 'http://localhost:8080/venues';
  private language: string = 'en';

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

  getAllVenues(): Observable<VenueResponse[]> {
    return this.http.get<VenueResponse[]>(this.apiUrl, this.getRequestOptions());
  }

  createVenue(venue: VenueRequest): Observable<VenueResponse> {
    return this.http.post<VenueResponse>(`${this.apiUrl}/new`, venue, this.getRequestOptions());
  }

  getVenueById(id: string | null): Observable<VenueResponse> {
      return this.http.get<VenueResponse>(`${this.apiUrl}/${id}`, this.getRequestOptions());
  }
}
