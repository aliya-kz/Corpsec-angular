import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SCRAPER_URI} from "../app.constants";

@Injectable({
  providedIn: 'root'
})
export class ScraperService {
  private apiUrl = SCRAPER_URI;

  constructor(private http: HttpClient) {
  }

  scrapeMinutes(folderPath: string): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}?folderPath=${folderPath}`);
  }
}
