import {Component, OnInit} from '@angular/core';
import {VoteService} from '../../service/vote.service';
import {VoteResponse} from '../../model/vote.model';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {
  votes: VoteResponse[] = [];

  constructor(private voteService: VoteService) {
  }

  ngOnInit(): void {
    this.loadVotes();
  }

  loadVotes(): void {
    this.voteService.getAllVotes().subscribe(votes => {
      this.votes = votes;
    });
  }
}
