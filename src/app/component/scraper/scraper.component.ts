import {Component} from '@angular/core';
import {ScraperService} from '../../service/scraper.service';

@Component({
  selector: 'app-scraper',
  templateUrl: './scraper.component.html',
  styleUrls: ['./scraper.component.css']
})
export class ScraperComponent {
  folderPath: string = '';
  scrapingResult: string = '';

  constructor(private scraperService: ScraperService) {
  }

  scrapeMinutes() {
    this.scraperService.scrapeMinutes(this.folderPath).subscribe(
      (response: any) => {
        this.scrapingResult = response;
      },
      (error: any) => {
        console.error('Error occurred while scraping minutes:', error);
      }
    );
  }
}
