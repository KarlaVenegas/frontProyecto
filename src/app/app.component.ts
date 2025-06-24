import {Component, NgModule} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Página Principal';
}


@NgModule({
  imports: [
    ReactiveFormsModule
  ],
})
export class AppModule { }
