import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAddressBook } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { AppState } from './store/states/app.state';
// import { RubricaActionType, SetUfficioSelezionato } from './store/actions/rubrica.action';
// import { selectHome } from './store/selectors/rubrica.selector';
// import { Subscription } from 'rxjs';
// import { IOffice } from './models/IOffice';

@Component({
    selector: 'vvfrubrica-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, SideBarComponent, FontAwesomeModule]
})
export class AppComponent {
    title = 'rubricadip';
    faAddressBook = faAddressBook;

    livello_ufficio = 0;
    data: any;
    errorMessage: string | null = null;

    constructor(private _storeApp$: Store<AppState>) { }

    ngOnInit() {
        //this._storeApp$.dispatch({ type: AuthUserActionType.GetAuthToken });
        //this._storeApp$.dispatch({ type: RubricaActionType.GetHomeRubrica });

        /*
        let homeItems: Array<IOffice> = [];
        let sub: Subscription = this._storeApp$.select(selectHome)
            .subscribe(office => {
                console.log("office: ", office);
                homeItems = [...office?.rubrica];

            });
        console.log("eeeeee: ", homeItems);
        this._storeApp$.dispatch(SetUfficioSelezionato({ ufficioSelezionato: homeItems[0] }));
        sub.unsubscribe();
        */
    }

    Goto_SediCentrali() {
        this.livello_ufficio = 1;
    }

    Goto_SediTerritoriali() {
        this.livello_ufficio = 2;
    }
}
