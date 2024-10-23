import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faPlusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { IContatto } from '../../../models/IContatto';
import { IOffice } from '../../../models/IOffice';

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

    //list: Array<IContatto> = [];
    ufficio?: IOffice;

    constructor(public bsModalRef: BsModalRef) {

    }

    onEditClick() {

    }
    onDelClick() {

    }

    onAddClick() { }
}
