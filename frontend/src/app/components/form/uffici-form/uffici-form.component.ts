import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faPlusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IOffice } from '../../../models/IOffice';
import { ContattiFormComponent } from '../contatti-form/contatti-form.component';
import { IContatto } from '../../../models/IContatto';
import { PersonaleFormComponent } from '../personale-form/personale-form.component';
import { DelContatto, DelPersonale, DelUfficio, SetPersonaDaMoficiare } from '../../../store/actions/rubrica.action';
import { AppState } from '../../../store/states/app.state';
import { Store } from '@ngrx/store';
import { IPersonale } from '../../../models/IPersonale';

@Component({
    selector: 'vvfrubrica-uffici-form',
    standalone: true,
    imports: [NgFor, NgIf, FontAwesomeModule],
    templateUrl: './uffici-form.component.html',
    styleUrl: './uffici-form.component.css'
})
export class UfficiFormComponent {
    faPlusCircle = faPlusCircle;
    faTrashAlt = faTrashAlt;
    faEdit = faEdit;

    title: string = '';
    closeBtnName?: string = 'Chiudi';

    ufficio?: IOffice;

    modalContatti?: BsModalRef | null;
    modalUffici?: BsModalRef | null;
    modalPersonale?: BsModalRef | null;

    constructor(private _storeApp$: Store<AppState>, public bsModalRef: BsModalRef, private modalService: BsModalService) { }

    onEditUfficioClick(ufficio: IOffice) {
        const initialState = {
            idContatto: 0,
            ufficio: ufficio,
            title: 'Modifica sotto ufficio',
            // list: []
        };

        this.openModalUffici(initialState);
    }

    onDelUfficioClick(ufficio: IOffice) {
        if (confirm('Cancellare contatto ' + ufficio.nomeUfficio + '?')) {
            // if (typeof (this.ufficio?.contatti) !== 'undefined') {
            // if (this.ufficio?.contatti?.length > 0) {
            // let temp: IContatto | undefined = this.ufficio?.contatti?.find(contact => contact.id != idContatto);
            this._storeApp$.dispatch(DelUfficio({ ufficio: ufficio }))
            // }
            // }
        }
    }

    onAddUfficioClick() {
        const initialState = {
            idContatto: 0,
            //ufficio: this.ufficio,
            title: 'Aggiungi sotto ufficio',
            // list: []
        };

        this.openModalUffici(initialState);
    }

    onAddContactClick() {
        const initialState = {
            idContatto: 0,
            ufficio: this.ufficio,
            title: 'Aggiungi contatto ',
            // list: []
        };

        this.openModalContatti(initialState);
    }

    onDelContattoClick(contatto: IContatto) {
        if (confirm('Cancellare contatto ' + contatto.tipo + '?')) {
            // if (typeof (this.ufficio?.contatti) !== 'undefined') {
            // if (this.ufficio?.contatti?.length > 0) {
            // let temp: IContatto | undefined = this.ufficio?.contatti?.find(contact => contact.id != idContatto);
            this._storeApp$.dispatch(DelContatto({ contatto: contatto }))
            // }
            // }
        }
    }

    onContactEditClick(contatto: IContatto) {
        // let contatto: IContatto | null = this.ufficio?.contatti?.find(o => o.id == id) ?? null;
        if (contatto) {
            const initialState = {
                idUfficio: this.ufficio?.codiceUfficio,
                ufficio: this.ufficio,
                contatto: contatto,
                title: 'Aggiungi contatto ',
                // list: []
            };

            this.openModalContatti(initialState);
        }
    }

    openModalContatti(initialState: object) {
        let config = {
            backdrop: true,
            // backdrop: 'static',
            ignoreBackdropClick: true,
            initialState, class: 'gray modal-sm',
            keyboard: true
        };
        this.modalContatti = this.modalService.show(ContattiFormComponent, config);
    }

    openModalUffici(initialState: object) {
        let config = {
            backdrop: true,
            // backdrop: 'static',
            ignoreBackdropClick: true,
            initialState, class: 'gray modal-xl',
            keyboard: true
        };
        this.modalUffici = this.modalService.show(UfficiFormComponent, config);
    }

    openModalPersonale(initialState: object) {
        let config = {
            backdrop: true,
            // backdrop: 'static',
            ignoreBackdropClick: true,
            initialState, class: 'gray modal-xl',
            keyboard: true
        };
        this.modalContatti = this.modalService.show(PersonaleFormComponent, config);
    }

    onSubmitClick() {
        console.log('submit click');

        this.bsModalRef.hide();
    }

    onAddPersonaleClick() {
        // let temp: IPersonale | undefined = this.ufficio?.personale?.find(pers => pers.id == id)
        // this._storeApp$.dispatch(SetPersonaDaMoficiare({ persona: temp }))

        const initialState = {
            title: 'Inserisci personale: ', // + off?.nomeUfficio,
        };

        this.openModalPersonale(initialState);
    }

    onEditPersonaleClick(persona: IPersonale) {
        // let temp: IPersonale | undefined = this.ufficio?.personale?.find(pers => pers.id == id)
        this._storeApp$.dispatch(SetPersonaDaMoficiare({ persona: persona }))

        const initialState = {
            title: 'Modifica personale: ', // + off?.nomeUfficio,
        };

        this.openModalPersonale(initialState);
    }

    onDelPersonaleClick(persona: IPersonale) {
        if (confirm('Cancellare persona ' + persona.cognome + '?')) {
            // if (typeof (this.ufficio?.personale) !== 'undefined') {
            // if (this.ufficio?.personale?.length > 0) {
            // let temp: IPersonale | null = this.ufficio?.personale?.find(pers => pers.id != id) ?? null;
            this._storeApp$.dispatch(DelPersonale({ persona: persona }))
            // }
            // }
        }
    }
}
