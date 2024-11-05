import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UfficiComponent } from "../uffici/uffici.component";
import { NgForOf, NgIf } from '@angular/common';
import { IOffice } from '../../models/IOffice';
import { AppState } from '../../store/states/app.state';
import { Store } from '@ngrx/store';
import { selectUfficioSelezionato } from '../../store/selectors/rubrica.selector';
import { MatExpansionModule } from '@angular/material/expansion';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faPlusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UfficiFormComponent } from '../form/uffici-form/uffici-form.component';
import { Office } from '../../models/Office';
import { DelUfficio } from '../../store/actions/rubrica.action';

@Component({
    selector: 'vvfrubrica-sottouffici',
    standalone: true,
    templateUrl: './sottouffici.component.html',
    styleUrl: './sottouffici.component.css',
    imports: [UfficiComponent, NgForOf, NgIf, MatExpansionModule, FontAwesomeModule]
})
export class SottoufficiComponent {
    faEdit = faEdit;
    faPlusCircle = faPlusCircle;
    faTrashAlt = faTrashAlt;

    ufficioSelezionato$ = this._storeApp$.select(selectUfficioSelezionato);
    ufficioSelezionato: IOffice = { codiceUfficio: "", coloreSfondo: "#ffffff", nomeUfficio: "", nomeTitolare: "", children: [] };
    @Output()
    clickSubOffice = new EventEmitter<string>();

    @Input()
    visualizeActionBar: boolean = false;

    bsModalRef?: BsModalRef | null;

    testVar: Office = new Office();

    constructor(private _storeApp$: Store<AppState>, private modalService: BsModalService) { }

    ngOnInit() {
        this.ufficioSelezionato$.subscribe(items => {
            this.ufficioSelezionato = { ...items };
            if (this.ufficioSelezionato?.children?.length > 0) {
                this.testVar.setOffices(this.ufficioSelezionato?.children);
            }
        });
    }

    leggiSottoAlbero(id: string) {
        this.clickSubOffice.emit(id);
    }

    onAddClick(id: string) {
        let off: IOffice | null = this.testVar.findOffice(id);

        const initialState = {
            title: 'Aggiungi ufficio in: ' + off?.nomeUfficio,
        };

        this.openModal(initialState);
    }

    // onEditClick(id: string) {
    onEditClick(office: IOffice) {
        // let off: IOffice | null = this.testVar.findOffice(id);

        const initialState = {
            title: 'Modifica Ufficio: ' + office?.nomeUfficio,
            ufficio: office,
        };

        this.openModal(initialState);
    }

    onDelClick(ufficio:IOffice) {
        if (confirm('Cancellare contatto ' + ufficio.nomeUfficio + '?')) {
            // if (typeof (this.ufficio?.contatti) !== 'undefined') {
            // if (this.ufficio?.contatti?.length > 0) {
            // let temp: IContatto | undefined = this.ufficio?.contatti?.find(contact => contact.id != idContatto);
            this._storeApp$.dispatch(DelUfficio({ ufficio: ufficio }))
            // }
            // }
        }
    }

    openModal(initialState: object) {
        this.bsModalRef = this.modalService.show(UfficiFormComponent, { initialState, class: 'gray modal-xl', backdrop: 'static' });
    }
}
