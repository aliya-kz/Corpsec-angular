import { Component } from '@angular/core';
import {AppModule} from "../../app.module";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    AppModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
