import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AppModule} from "./app.module";
import {NgIf} from "@angular/common";
import {HeaderComponent} from "./component/header/header.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppModule, NgIf, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}

