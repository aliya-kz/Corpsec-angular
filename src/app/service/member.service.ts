import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {MemberResponse} from '../model/member.model';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LanguageService} from "./language.service";
import {DEFAULT_LANGUAGE, LANGUAGE_HEADER, MEMBERS_URI} from "../app.constants";


@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private apiUrl = MEMBERS_URI;
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

  getAllMembers(): Observable<MemberResponse[]> {
    return this.http.get<MemberResponse[]>(`${this.apiUrl}/including-nonactive`, this.getRequestOptions());
  }

  getAllActiveMembers(): Observable<MemberResponse[]> {
    return this.http.get<MemberResponse[]>(`${this.apiUrl}`,  this.getRequestOptions());
  }

  createMember(request: { endDate: string; fullName: string; shortName: string; startDate: string }): Observable<MemberResponse> {
    return this.http.post<MemberResponse>(`${this.apiUrl}/new`, request,  this.getRequestOptions());
  }

  getMemberById(id: string | null): Observable<MemberResponse> {
    return this.http.get<MemberResponse>(`${this.apiUrl}/${id}`, this.getRequestOptions());
  }

  updateMember(id: string, request: { endDate: string; fullName: string; id: string; shortName: string; startDate: string }): Observable<MemberResponse> {
    return this.http.patch<MemberResponse>(`${this.apiUrl}/${id}`, request, this.getRequestOptions());
  }
}
