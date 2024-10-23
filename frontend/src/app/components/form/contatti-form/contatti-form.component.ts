import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { IOffice } from '../../../models/IOffice';
import { IContatto } from '../../../models/IContatto';
import { AppState } from '../../../store/states/app.state';
import { Store } from '@ngrx/store';
import { SetContatto } from '../../../store/actions/rubrica.action';

@Component({
    selector: 'vvfrubrica-contatti-form',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule],
    templateUrl: './contatti-form.component.html',
    styleUrl: './contatti-form.component.css'
})
export class ContattiFormComponent {
    title: string = '';
    closeBtnName?: string = 'Chiudi';
    idContatto: string = '';
    ufficio: IOffice = { codiceUfficio: '', nomeTitolare: '', nomeUfficio: '', contatti: [], children: [] };
    contatto: IContatto | null = null;
    contattoForm: FormGroup;

    constructor(public modalContatti: BsModalRef, private fb: FormBuilder, private _appStore$: Store<AppState>) {
        this.contattoForm = this.fb.group({
            // id: ['', Validators.required],
            id: ['0'],
            tipoContatto: ['', Validators.required],
            contatto: ['', Validators.required],
        });
    }

    ngOnInit() {
        if (this.contatto) {
            this.contattoForm.setValue({
                id: this.contatto.id,
                tipoContatto: this.contatto.tipo,
                contatto: this.contatto.contatto
            });
        }
    }

    onSubmit() {
        if (this.contattoForm.valid) {
            let tempContatto: IContatto = {
                id: this.contattoForm.get('id')?.value,
                tipo: this.contattoForm.get('tipoContatto')?.value,
                contatto: this.contattoForm.get('contatto')?.value
            };

            this._appStore$.dispatch(SetContatto({ contatto: tempContatto, codiceUfficio: this.ufficio.codiceUfficio }));
            this.modalContatti.hide();
            //console.log('idUfficio: ', this.idUfficio, 'tipo: ', tipoContatto, ' - contatto: ', contatto);
            /*
                        let tempUfficio: IOffice = { ...this.ufficio };

                        if (typeof tempUfficio?.contatti === 'undefined') {
                            console.log('undefined');

                            tempUfficio.contatti = [tempContatto];
                        } else {
                            if (tempUfficio.contatti.length > 0) {
                                console.log('maggione di zero');
                                let xx = [...tempUfficio.contatti];
                                xx.push(tempContatto);
                                tempUfficio.contatti = [...xx];
                            } else {
                                tempUfficio.contatti = [tempContatto];
                            }
                        }
                        this.ufficio = { ...tempUfficio };

                        console.log('oioioioo: ', this.ufficio.contatti);
                        */

            // this.authService.login(username, password).subscribe({
            //     next: () => this.router.navigate(['/']),
            //     error: (err) => alert('Errore di autenticazione!'),
            // });
        }
    }
}
