import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { IOffice } from '../../models/IOffice';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/states/app.state';
import { AddElencoUfficiSelezionati, EmptyElencoUfficiSelezionati, SetIdSelectedOfficeComponent, SetUfficioSelezionato } from '../../store/actions/rubrica.action';
import {
    selectElencoUfficiSelezionati,
    selectIdSelectedOfficeComponent,
    selectUfficioSelezionato,
} from '../../store/selectors/rubrica.selector';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faPlusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UfficiFormComponent } from '../form/uffici-form/uffici-form.component';
import { selectLoggedUser } from '../../store/selectors/authuser.selector';

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

    @Input() itemDst: IOffice = { codiceUfficio: "", coloreSfondo: "#ffffff", nomeUfficio: "", nomeTitolare: "", children: [] };
    @Output() back = new EventEmitter<string>();

    ufficioSelezionato$ = this._storeApp$.select(selectUfficioSelezionato);
    ufficioSelezionato: IOffice | null = null;

    elencoUfficiSelezionati$ = this._storeApp$.select(selectElencoUfficiSelezionati);
    elencoUfficiSelezionati: Array<IOffice | null> | null = null;

    idSelectedOfficeComponent$ = this._storeApp$.select(selectIdSelectedOfficeComponent);
    idSelectedOfficeComponent: string = '';

    @Input()
    visualizeActionBar: boolean = false;

    constructor(private _storeApp$: Store<AppState>, private modalService: BsModalService,) { }

    ngOnInit(): void {
        this.ufficioSelezionato$.subscribe(items => this.ufficioSelezionato = { ...items });
        this.elencoUfficiSelezionati$.subscribe(ele => this.elencoUfficiSelezionati = ele);
        this.idSelectedOfficeComponent$.subscribe(id => this.idSelectedOfficeComponent = id);
    }

    leggiSottoAlbero() {
        this._storeApp$.dispatch(SetIdSelectedOfficeComponent({ id: this.itemDst.codiceUfficio }));

        if (this.itemDst.codiceUfficioSuperiore == '') {
            this._storeApp$.dispatch(EmptyElencoUfficiSelezionati());
            this._storeApp$.dispatch(AddElencoUfficiSelezionati({ ufficioSelezionato: this.itemDst }));
        }

        this._storeApp$.dispatch(SetUfficioSelezionato({ ufficioSelezionato: this.itemDst }));
    }

    onClickUfficioSelezionato() {
        this.back.emit('back');
    }

    onAddClick() {
        const initialState = {
            title: 'Aggiungi ufficio in: '+this.itemDst.nomeUfficio,
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
        this.bsModalRef = this.modalService.show(UfficiFormComponent, { initialState, class: 'gray modal-xl', backdrop: 'static' });
    }
}
