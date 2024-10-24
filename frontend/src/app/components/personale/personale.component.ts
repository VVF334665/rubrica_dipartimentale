import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/states/app.state';
import { IOffice } from '../../models/IOffice';
import { selectUfficioSelezionato } from '../../store/selectors/rubrica.selector';
import { NgForOf, NgIf } from '@angular/common';
import { faAddressBook, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
    selector: 'vvfrubrica-personale',
    standalone: true,
    imports: [NgForOf, NgIf, FontAwesomeModule],
    templateUrl: './personale.component.html',
    styleUrl: './personale.component.css'
})
export class PersonaleComponent {
    faAddressBook = faAddressBook;
    faEdit = faEdit;
    faTrashAlt = faTrashAlt;

    ufficioSelezionato$ = this._storeApp$.select(selectUfficioSelezionato);
    ufficioSelezionato?: IOffice = { codiceUfficio: "", coloreSfondo: "#ffffff", nomeUfficio: "", nomeTitolare: "", children: [] };

    @Input()
    visualizeActionBar: boolean = false;

    constructor(private _storeApp$: Store<AppState>) { }

    ngOnInit() {
        this.ufficioSelezionato$.subscribe(
            items => {
                this.ufficioSelezionato = { ...items };
            }
        );
    }

    onEditPersonClick(id: number) {

    }

    onDelPersonClick(id: number) {
        if (confirm('Conferma cancellazione?')) {
            console.log('cancellato !!!');
        }
    }
}
