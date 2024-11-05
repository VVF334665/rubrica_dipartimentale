import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IPersonale } from '../../../models/IPersonale';
import { AppState } from '../../../store/states/app.state';
import { Store } from '@ngrx/store';
import { selectPersonaDaModificare, selectUfficioSelezionato } from '../../../store/selectors/rubrica.selector';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { faEdit, faPlusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ContattiFormComponent } from '../contatti-form/contatti-form.component';
import { DelContattoPersonale, SavePersonale } from '../../../store/actions/rubrica.action';
import { IOffice } from '../../../models/IOffice';
import { ElencoUfficiComponent } from '../../elenco-uffici/elenco-uffici.component';
import { IContatto } from '../../../models/IContatto';

@Component({
    selector: 'vvfrubrica-personale-form',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, NgFor, FontAwesomeModule],
    templateUrl: './personale-form.component.html',
    styleUrl: './personale-form.component.css'
})
export class PersonaleFormComponent {
    faEdit = faEdit;
    faTrashAlt = faTrashAlt;
    faPlusCircle = faPlusCircle;

    title: string = '';
    closeBtnName?: string = 'Chiudi';

    persona$ = this._storeApp$.select(selectPersonaDaModificare);
    persona: IPersonale = { id: 0, cognome: '', nome: '', codiceUfficio: '' };
    ufficioSelezionato$ = this._storeApp$.select(selectUfficioSelezionato);
    ufficioSelezionato: IOffice | null = null;

    personaForm: FormGroup;

    modalContatti?: BsModalRef;
    modalElencoUffici?: BsModalRef;

    constructor(public modal: BsModalRef, private _storeApp$: Store<AppState>, private fb: FormBuilder, private modalService: BsModalService) {
        this.personaForm = this.fb.group({
            id: 0,
            cognome: [''],
            nome: [''],
            qualifica: [''],
            codiceUfficio: [''],
            nomeUfficio: [''],
        });
    }

    ngOnInit() {
        this.persona$.subscribe(pers => {
            this.persona = pers;

            if (this.persona) {
                this.personaForm.setValue({
                    id: this.persona.id,
                    cognome: this.persona.cognome,
                    nome: this.persona.nome,
                    qualifica: this.persona.qualifica,
                    codiceUfficio: this.persona.codiceUfficio,
                    nomeUfficio: this.ufficioSelezionato?.nomeUfficio ?? '',
                });
            }
        });

        this.ufficioSelezionato$.subscribe(items => {
            this.ufficioSelezionato = { ...items }
            this.personaForm.patchValue({ nomeUfficio: this.ufficioSelezionato?.nomeUfficio ?? '' });
        });
    }

    onSubmit() {
        let temp: IPersonale = {
            id: 0,
            cognome: this.personaForm.controls['cognome'].value,
            nome: this.personaForm.controls['nome'].value,
            qualifica: this.personaForm.controls['qualifica'].value,
            codiceUfficio: this.personaForm.controls['codiceUfficio'].value,
        };
        this._storeApp$.dispatch(SavePersonale({ persona: temp }));
        this.modal?.hide();
    }

    onAddClick() {
        // let temp = this.persona.contatti?.find(cont => cont.id === idContatto);

        const initialState = {
            // contatto: temp,
            title: 'Aggiungi contatto ',
        };

        this.openModal(initialState);
    }

    onEditClick(contatto: IContatto) {
        // let temp = this.persona.contatti?.find(cont => cont.id === idContatto);

        const initialState = {
            contatto: contatto,
            title: 'Modifica contatto ',
        };

        this.openModal(initialState);
    }

    onDelClick(idContatto: number) {
        if (confirm('Conferma cancellazione?')) {
            let temp = this.persona.contatti?.find(cont => cont.id === idContatto);
            this._storeApp$.dispatch(DelContattoPersonale({ contatto: temp }));
        }
    }

    openModal(initialState: object) {
        this.modalContatti = this.modalService.show(ContattiFormComponent, { initialState, class: 'gray modal-sm', backdrop: 'static' });
    }

    onClickUffici() {
        let obj: string = 'ElencoUfficiComponent';

        const initialState = {
            //title: 'Aggiungi contatto ',
            codiceUfficioPrecedente: this.persona.codiceUfficio
        };

        this.modalElencoUffici = this.modalService.show(ElencoUfficiComponent, { initialState, class: 'gray modal-lg m-auto', backdrop: 'static' });
    }
}
