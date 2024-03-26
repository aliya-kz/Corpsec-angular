import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {MemberComponent} from "./component/member-list/member/member.component";
import {MemberListComponent} from "./component/member-list/member-list.component";
import {HttpClient, HttpClientModule, HttpClientXsrfModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommitteeComponent} from "./component/committee-list/committee/committee.component";
import {HeaderComponent} from "./component/header/header.component";
import {CommitteeListComponent} from "./component/committee-list/committee-list.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {VenueComponent} from "./component/venue/venue.component";
import {EditMeetingComponent} from "./component/meeting-list/edit-meeting/edit-meeting.component";
import {MeetingListComponent} from "./component/meeting-list/meeting-list.component";
import {VoteComponent} from "./component/vote/vote.component";
import {AgendaItemComponent} from "./component/meeting-list/agenda-item/agenda-item.component";
import {MeetingComponent} from "./component/meeting-list/meeting/meeting.component";
import {LanguageComponent} from "./component/language/language.component";
import {ScraperComponent} from "./component/scraper/scraper.component";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MemberComponent,
    MemberListComponent,
    CommitteeComponent,
    CommitteeListComponent,
    VenueComponent,
    MeetingComponent,
    MeetingListComponent,
    EditMeetingComponent,
    HeaderComponent,
    VoteComponent,
    AgendaItemComponent,
    LanguageComponent,
    ScraperComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    HttpClientXsrfModule,
    MatFormFieldModule,
    MatSelect,
    MatOption,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [HttpClientModule,
    TranslateService
  ],
  exports: [
    MemberListComponent,
    CommitteeComponent,
    HeaderComponent,
    LanguageComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
