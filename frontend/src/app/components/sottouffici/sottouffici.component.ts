import { Component, EventEmitter, Output } from '@angular/core';
import { UfficiComponent } from "../uffici/uffici.component";
import { NgForOf } from '@angular/common';
import { IOffice } from '../../models/IOffice';
import { AppState } from '../../store/states/app.state';
import { Store } from '@ngrx/store';
import { selectUfficioSelezionato } from '../../store/selectors/rubrica.selector';
import { MatExpansionModule } from '@angular/material/expansion';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faPlusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'vvfrubrica-sottouffici',
    standalone: true,
    templateUrl: './sottouffici.component.html',
    styleUrl: './sottouffici.component.css',
    imports: [UfficiComponent, NgForOf, MatExpansionModule, FontAwesomeModule]
})
export class SottoufficiComponent {
    faEdit = faEdit;
    faPlusCircle = faPlusCircle;
    faTrashAlt = faTrashAlt;

    ufficioSelezionato$ = this._storeApp$.select(selectUfficioSelezionato);
    ufficioSelezionato: IOffice = { codiceUfficio: "", coloreSfondo: "#ffffff", nomeUfficio: "", nomeTitolare: "", children: [] };
    @Output() clickSubOffice = new EventEmitter<string>();

    constructor(private _storeApp$: Store<AppState>) { }

    ngOnInit() {
        this.ufficioSelezionato$.subscribe(items => this.ufficioSelezionato = { ...items });
    }

    leggiSottoAlbero(codiceUO: string) {
        this.clickSubOffice.emit(codiceUO);
    }

    onAddClick() {
        console.log('addd');
    }

    onEditClick() {
        console.log('editt');
    }

    onDelClick() {
        console.log('delll');
    }
}
