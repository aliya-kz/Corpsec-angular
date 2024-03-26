import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScraperService {
  private apiUrl = 'http://localhost:8080/scraper';

  constructor(private http: HttpClient) {
  }

  scrapeMinutes(folderPath: string): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}?folderPath=${folderPath}`);
  }
}
