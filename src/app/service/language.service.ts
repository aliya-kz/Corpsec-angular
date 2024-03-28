import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private languageSubject: BehaviorSubject<string>;
  public languageChanged: Observable<string>;

  private STORAGE_KEY = 'app_language';

  constructor() {
    const storedLanguage = localStorage.getItem(this.STORAGE_KEY);
    this.languageSubject = new BehaviorSubject<string>(storedLanguage || 'en');
    this.languageChanged = this.languageSubject.asObservable();
  }

  setLanguage(language: string): void {
    this.languageSubject.next(language);
    localStorage.setItem(this.STORAGE_KEY, language);
  }
}
