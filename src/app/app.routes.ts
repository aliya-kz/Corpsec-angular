import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MemberListComponent} from './component/member-list/member-list.component';
import {MemberComponent} from './component/member-list/member/member.component';
import {CommitteeComponent} from "./component/committee-list/committee/committee.component";
import {CommitteeListComponent} from "./component/committee-list/committee-list.component";
import {VenueComponent} from "./component/venue/venue.component";
import {MeetingListComponent} from "./component/meeting-list/meeting-list.component";
import {EditMeetingComponent} from "./component/meeting-list/edit-meeting/edit-meeting.component";
import {VoteComponent} from "./component/vote/vote.component";
import {AgendaItemComponent} from "./component/meeting-list/agenda-item/agenda-item.component";
import {MeetingComponent} from "./component/meeting-list/meeting/meeting.component";

export const routes: Routes = [
  {path: 'members', component: MemberListComponent},
  {path: 'members/:id', component: MemberComponent},
  {path: "committees", component: CommitteeListComponent},
  {path: 'committees/:id', component: CommitteeComponent},
  {path: "committees/including-nonactive", component: CommitteeListComponent},
  {path: "venues", component: VenueComponent},
  {path: "meetings", component: MeetingListComponent},
  {path: 'meetings/:id', component: MeetingComponent},
  { path: 'meetings/:id/edit', component: EditMeetingComponent },
  {path: 'votes', component: VoteComponent},
  {path: 'agenda-items', component: AgendaItemComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
