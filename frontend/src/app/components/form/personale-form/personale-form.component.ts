import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IPersonale } from '../../../models/IPersonale';
import { AppState } from '../../../store/states/app.state';
import { Store } from '@ngrx/store';
import { selectPersonaDaModificare } from '../../../store/selectors/rubrica.selector';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
    selector: 'vvfrubrica-personale-form',
    standalone: true,
    imports: [FormsModule,ReactiveFormsModule,NgFor],
    templateUrl: './personale-form.component.html',
    styleUrl: './personale-form.component.css'
})
export class PersonaleFormComponent {
    title: string = '';
    closeBtnName?: string = 'Chiudi';
    persona$ = this._storeApp$.select(selectPersonaDaModificare);
    persona: IPersonale = { id: 0, cognome: '', nome: '', codiceUfficio: '' };
    personaForm: FormGroup;

    constructor(public modal: BsModalRef, private _storeApp$: Store<AppState>, private fb: FormBuilder) {
        this.personaForm = this.fb.group({
            id: 0,
            cognome: [''],
            nome: [''],
            qualifica: [''],
        });
    }

    ngOnInit() {
        this.persona$.subscribe(pers => {
            this.persona = pers;

            if (this.persona){
                this.personaForm.setValue({
                    id:this.persona.id,
                    cognome: this.persona.cognome,
                    nome: this.persona.nome,
                    qualifica: this.persona.qualifica
                });
            }
        });
    }

    onSubmit(){

    }

    openModal(initialState: object) {
        // this.modal = this.modalService.show(PersonaleFormComponent, { initialState, class: 'gray modal-xl', backdrop: 'static' });
    }
}
