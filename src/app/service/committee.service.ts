import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CommitteeRequest, CommitteeResponse} from "../model/committee.model";
import {CommitteeMemberRequest} from "../model/committee-member.model";
import {LanguageService} from "./language.service";

@Injectable({
  providedIn: 'root'
})
export class CommitteeService {
  private apiUrl = 'http://localhost:8080/committees';
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

  getAllCommittees(): Observable<CommitteeResponse[]> {
    return this.http.get<CommitteeResponse[]>(`${this.apiUrl}/including-nonactive`, this.getRequestOptions());
  }

  getAllActiveCommittees(): Observable<CommitteeResponse[]> {
    return this.http.get<CommitteeResponse[]>(`${this.apiUrl}`, this.getRequestOptions());
  }

  getCommitteeById(id: string | null): Observable<CommitteeResponse> {
    return this.http.get<CommitteeResponse>(`${this.apiUrl}/${id}`, this.getRequestOptions());
  }

  updateCommittee(committeeId: string | null, committee: CommitteeRequest): Observable<CommitteeRequest> {
    return this.http.patch<CommitteeRequest>(`${this.apiUrl}/${committee.id}`, committee, this.getRequestOptions());
  }

  createCommittee(committee: CommitteeRequest): Observable<CommitteeRequest> {
    return this.http.post<CommitteeRequest>(`${this.apiUrl}/new`, committee, this.getRequestOptions());
  }

  addCommitteeMember(committeeId: string | null, committeeMember: CommitteeMemberRequest): Observable<CommitteeRequest> {
    return this.http.post<CommitteeRequest>(`${this.apiUrl}/${committeeId}`, committeeMember, this.getRequestOptions());
  }
}
