import {Component} from '@angular/core';
import {LanguageService} from "../../service/language.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html'
})
export class LanguageComponent {
  constructor(private languageService: LanguageService, private translateService: TranslateService) {
  }

  switchLanguage(language: string): void {
    this.translateService.use(language);
    this.languageService.setLanguage(language);
    window.location.reload();
  }
}
