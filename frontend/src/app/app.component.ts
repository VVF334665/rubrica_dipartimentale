import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAddressBook } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { AppState } from './store/states/app.state';

@Component({
    selector: 'vvfrubrica-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, SideBarComponent, FontAwesomeModule]
})
export class AppComponent {
    title = 'Rubrica Dipartimentale';
    faAddressBook = faAddressBook;

    livello_ufficio = 0;
    data: any;
    errorMessage: string | null = null;

    constructor(private _storeApp$: Store<AppState>) { }

    ngOnInit() {
    }

    Goto_SediCentrali() {
        this.livello_ufficio = 1;
    }

    Goto_SediTerritoriali() {
        this.livello_ufficio = 2;
    }
}
