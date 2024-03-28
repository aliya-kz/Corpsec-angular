import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { VenueResponse, VenueRequest } from '../model/venue.model';
import {LanguageService} from "./language.service";
import {DEFAULT_LANGUAGE, LANGUAGE_HEADER, VENUES_URI} from "../app.constants";

@Injectable({
  providedIn: 'root'
})
export class VenueService {
  private apiUrl = VENUES_URI;
  private language: string = DEFAULT_LANGUAGE;

  constructor(private http: HttpClient, private languageService: LanguageService) {
    this.languageService.languageChanged.subscribe((language: string) => {
      this.language = language;
    });
  }

  private getRequestOptions(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders().set(LANGUAGE_HEADER, this.language)
    };
  }

  getAllVenues(): Observable<VenueResponse[]> {
    return this.http.get<VenueResponse[]>(this.apiUrl, this.getRequestOptions());
  }

  createVenue(venue: VenueRequest): Observable<VenueResponse> {
    return this.http.post<VenueResponse>(`${this.apiUrl}/new`, venue, this.getRequestOptions());
  }
}
