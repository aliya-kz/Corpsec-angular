import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { VoteResponse } from '../model/vote.model';
import {LanguageService} from "./language.service";

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  private apiUrl = 'http://localhost:8080/votes';
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

  getAllVotes(): Observable<VoteResponse[]> {
    return this.http.get<VoteResponse[]>(this.apiUrl, this.getRequestOptions());
  }
}
