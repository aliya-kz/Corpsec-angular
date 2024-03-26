import { Component, OnInit } from '@angular/core';
import { VenueService } from '../../service/venue.service';
import { VenueResponse, VenueRequest } from '../../model/venue.model';

@Component({
  selector: 'app-venue',
  templateUrl: './venue.component.html',
  styleUrls: ['./venue.component.css']
})

export class VenueComponent implements OnInit {
  venues: VenueResponse[] = [];
  newVenue: VenueRequest = { nameEn: '', nameRu: '' };

  constructor(private venueService: VenueService) { }

  ngOnInit(): void {
    this.loadVenues();
  }

  loadVenues(): void {
    this.venueService.getAllVenues().subscribe(venues => {
      this.venues = venues;
    });
  }

  createVenue(): void {
    this.venueService.createVenue(this.newVenue).subscribe(() => {
      this.newVenue = { nameEn: '', nameRu: '' };
      this.loadVenues();
    });
  }
}
