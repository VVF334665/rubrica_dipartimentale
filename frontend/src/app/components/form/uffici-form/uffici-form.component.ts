import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faPlusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IOffice } from '../../../models/IOffice';
import { ContattiFormComponent } from '../contatti-form/contatti-form.component';
import { IContatto } from '../../../models/IContatto';
import { PersonaleFormComponent } from '../personale-form/personale-form.component';

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

    constructor(public bsModalRef: BsModalRef, private modalService: BsModalService) {

    }

    onEditClick() {

    }
    onDelClick() {

    }

    onAddClick() {
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

        this.openModal(initialState);
    }

    onContactEditClick(id: number) {
        let contatto: IContatto | null = this.ufficio?.contatti?.find(o => o.id == id) ?? null;
        if (contatto) {
            const initialState = {
                idUfficio: this.ufficio?.codiceUfficio,
                ufficio: this.ufficio,
                contatto: contatto,
                title: 'Aggiungi contatto ',
                // list: []
            };

            this.openModal(initialState);
        }
    }

    openModal(initialState: object) {
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
        this.modalContatti = this.modalService.show(UfficiFormComponent, config);
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
}
