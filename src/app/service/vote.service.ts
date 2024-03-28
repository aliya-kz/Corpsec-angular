import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { VoteResponse } from '../model/vote.model';
import {LanguageService} from "./language.service";
import {DEFAULT_LANGUAGE, LANGUAGE_HEADER, VOTES_URI} from "../app.constants";

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  private apiUrl = VOTES_URI;
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

  getAllVotes(): Observable<VoteResponse[]> {
    return this.http.get<VoteResponse[]>(this.apiUrl, this.getRequestOptions());
  }
}
