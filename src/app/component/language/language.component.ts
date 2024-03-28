import {Component} from '@angular/core';
import {LanguageService} from "../../service/language.service";

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html'
})
export class LanguageComponent {
  constructor(private languageService: LanguageService) {
  }

  switchLanguage(language: string): void {
    this.languageService.setLanguage(language);
    window.location.reload();
  }
}
