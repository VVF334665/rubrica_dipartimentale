import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { IOffice } from '../../models/IOffice';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/states/app.state';
import * as RubricaActions from '../../store/actions/rubrica.action';
import * as RubricaSelectors from '../../store/selectors/rubrica.selector';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faPlusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UfficiFormComponent } from '../form/uffici-form/uffici-form.component';
import { map, Observable, take } from 'rxjs';

@Component({
    selector: 'vvfrubrica-uffici',
    standalone: true,
    imports: [CommonModule, MatExpansionModule, NgIf, FontAwesomeModule],
    templateUrl: './uffici.component.html',
    styleUrl: './uffici.component.css'
})
export class UfficiComponent {

    faEdit = faEdit;
    faPlusCircle = faPlusCircle;
    faTrashAlt = faTrashAlt;

    bsModalRef?: BsModalRef | null;

    @Input()
    itemDst: IOffice = { codiceUfficio: "", coloreSfondo: "#ffffff", nomeUfficio: "", nomeTitolare: "", children: [] };

    @Input()
    visualizeActionBar: boolean = false;

    @Output()
    back = new EventEmitter<string>();

    ufficioSelezionato$: Observable<IOffice> = this._storeApp$.select(RubricaSelectors.selectUfficioSelezionato);
    codiceUfficioSelezionato$: Observable<string> = this._storeApp$.select(RubricaSelectors.selectUfficioSelezionato).pipe(map(x => x.codiceUfficio));
    coloreUfficioSelezionato$: Observable<string> = this._storeApp$.select(RubricaSelectors.selectUfficioSelezionato).pipe(map(x => x.coloreSfondo));
    elencoUfficiSelezionati$: Observable<IOffice[]> = this._storeApp$.select(RubricaSelectors.selectElencoUfficiSelezionati);
    elencoUfficiSelezionatiLength$ = this.elencoUfficiSelezionati$.pipe(map(x => x.length));
    idSelectedOfficeComponent$: Observable<boolean> = this._storeApp$.select(RubricaSelectors.selectIdSelectedOfficeComponent).pipe(map(x => x == this.itemDst.codiceUfficio));

    constructor(private readonly _storeApp$: Store<AppState>, private readonly modalService: BsModalService,) { }

    leggiSottoAlbero() {
        this._storeApp$.dispatch(RubricaActions.SetIdSelectedOfficeComponent({ id: this.itemDst.codiceUfficio }));

        if (this.itemDst.codiceUfficioSuperiore == '') {
            this._storeApp$.dispatch(RubricaActions.EmptyElencoUfficiSelezionati());
            this._storeApp$.dispatch(RubricaActions.AddElencoUfficiSelezionati({ ufficioSelezionato: this.itemDst }));
        }

        this._storeApp$.dispatch(RubricaActions.SetUfficioSelezionato({ ufficioSelezionato: this.itemDst }));
    }

    onClickUfficioSelezionato() {
        this.back.emit('back');
    }

    onAddClick() {
        const initialState = {
            title: 'Aggiungi ufficio in: ' + this.itemDst.nomeUfficio,
            list: []
        };
        this.openModal(initialState);
    }

    onEditClick() {
        const initialState = {
            title: 'Modifica Ufficio: ' + this.itemDst?.nomeUfficio,
            ufficio: this.itemDst,
        };
        this.openModal(initialState);
    }

    onDelClick() {
        console.log('delll');
    }

    openModal(initialState: object) {
        let config = {
            backdrop: true,
            // backdrop: 'static',
            ignoreBackdropClick: true,
            initialState, class: 'gray modal-xl',
        };
        this.bsModalRef = this.modalService.show(UfficiFormComponent, config);
    }

    colorSelected(value: string | undefined, primary: boolean) {
        // https://cssgradient.io/
        if (primary) {
            return "linear-gradient(90deg, rgba(255,255,255,0.9) 90%, " + (value ?? "rgba(172,26,23,1)") + " 105%)"
        }
        return "linear-gradient(90deg, rgba(255,255,255,0.9) 100%, " + (value ?? "rgba(172,26,23,1)") + " 100%)"
    }

    elaborateBorder() {
        let valueOut: string = "";
        this.coloreUfficioSelezionato$
            .pipe(take(1))
            .subscribe((x => valueOut = x));
        return valueOut ?? "#ac1a17"
    }
}