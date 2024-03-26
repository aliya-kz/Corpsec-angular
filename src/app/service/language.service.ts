import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {TranslateService} from "@ngx-translate/core";


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
   //this.translateService.use(language);
    this.languageSubject.next(language);
    localStorage.setItem(this.STORAGE_KEY, language);
  }

  getLanguage(): string {
    return this.languageSubject.getValue();
  }
}
