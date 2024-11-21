import { Component } from '@angular/core';
import { IUser } from '../../../models/IUser';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faPlusCircle, faTrashAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { AppState } from '../../../store/states/app.state';
import { Store } from '@ngrx/store';
import { selectProfile, selectUtenteDaModificare } from '../../../store/selectors/users.selector';
import { NgForOf } from '@angular/common';
import { IProfili } from '../../../models/IProfili';
import { SaveUser, SaveUserSuccess, UsersActionType } from '../../../store/actions/users.action';
import { ElencoUfficiComponent } from '../../elenco-uffici/elenco-uffici.component';
import { IOffice } from '../../../models/IOffice';
import { selectElencoUfficiSelezionatoPerModifica } from '../../../store/selectors/rubrica.selector';
import { Actions, ofType } from '@ngrx/effects';
import { SetElencoUfficiSelezionatoPerModifica } from '../../../store/actions/rubrica.action';

@Component({
    selector: 'vvfrubrica-user-form',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, FontAwesomeModule, NgForOf],
    templateUrl: './user-form.component.html',
    styleUrl: './user-form.component.css'
})
export class UserFormComponent {
    faEdit = faEdit;
    faTrashAlt = faTrashAlt;
    faPlusCircle = faPlusCircle;

    title: string = 'Modifica Utente';
    closeBtnName?: string = 'Chiudi';

    user$ = this._storeApp$.select(selectUtenteDaModificare);
    // user: IUser | null = { id: 0, username: '', profilo: 0, descrizioneProfilo: '' };
    user: IUser = { id: 0, username: '', profilo: 0, descrizioneProfilo: '' };

    profileList$ = this._storeApp$.select(selectProfile);
    profileList: Array<IProfili> = [];

    userForm: FormGroup;
    ufficiModal?: BsModalRef;

    ufficioDaModificare: IOffice | null = null;
    elencoUfficiSelezionatoPerModifica$ = this._storeApp$.select(selectElencoUfficiSelezionatoPerModifica);


    constructor(private _storeApp$: Store<AppState>, public modal: BsModalRef, private fb: FormBuilder, private modalService: BsModalService,
        private _actions$: Actions
    ) {

        this.userForm = this.fb.group({
            id: 0,
            username: [''],
            profilo: 0,
            uffici: [],
        });
    }

    ngOnInit() {
        this.user$.subscribe(u => {
            this.user = u;

            this.profileList$.subscribe(items => {
                this.profileList = [...(items ?? [])]
            });

            if (u) {
                this.userForm.setValue({
                    id: u.id,
                    username: u.username,
                    profilo: u.profilo,
                    uffici: u.uffici ?? [],
                    //codiceUfficio: []
                });
            }
        });

        this.elencoUfficiSelezionatoPerModifica$.subscribe(temp => {
            if (!Array.isArray(temp) && temp != null) {
                let us: IUser = { ...this.user };
                let u: any[] = [];
                let finded: boolean = false;
                console.log("temp: ",temp);

                let z = { codiceUfficio: temp.codiceUfficio, descrizione: temp.nomeUfficio }

                this.user.uffici?.forEach(element => {
                    if (element['codiceUfficio'] == this.ufficioDaModificare?.codiceUfficio) {
                        finded = true;
                        u.push(z);
                    } else {
                        u.push(element)
                    }
                });

                if (finded == false) {
                    u.push(z);
                }

                us.uffici = [...u];
                this.user = { ...us };

                this.userForm.patchValue({ ufici: this.user.uffici })
                this.ufficioDaModificare = null;
            }
        });
    }

    onSubmit() {
        let temp: IUser = { ...this.user };
        temp.id = this.userForm.controls['id'].value;
        temp.username = this.userForm.controls['username'].value;
        temp.profilo = this.userForm.controls['profilo'].value;
        temp.uffici = this.userForm.controls['uffici'].value;

        this.user = { ...temp };

        //console.log(this.userForm.controls['id'].value);
        //console.log(this.userForm.controls['username'].value);
        //console.log(this.userForm.controls['profilo'].value);
        //console.log(this.userForm.controls['uffici'].value);

        this._storeApp$.dispatch(SaveUser({ user: this.user }));
        this._actions$.pipe(ofType(UsersActionType.SaveUserSuccess))
            .subscribe(() => {
                this._storeApp$.dispatch(SetElencoUfficiSelezionatoPerModifica({ ufficio: null }));
            });
        this.modal.hide();
    }

    onDelClick(id: number) { }

    onEditClick(office: IOffice) {
        let obj: string = 'ElencoUfficiComponent';

        this.ufficioDaModificare = office;

        const initialState = {
            //title: 'Aggiungi contatto ',
            codiceUfficioPrecedente: office.codiceUfficio
        };

        this.ufficiModal = this.modalService.show(ElencoUfficiComponent, { initialState, class: 'gray modal-lg m-auto', backdrop: 'static' });
        // this.ufficiModal.onHide?.subscribe(data => {
        //     this._storeApp$.dispatch(SetElencoUfficiSelezionatoPerModifica({ ufficio: null }));
        //     //console.log(data)
        //     if (data) {
        //         // you can check if the modal returns any data or not
        //     }
        // });
    }

    onAddClick() {
        let obj: string = 'ElencoUfficiComponent';

        //this.ufficioDaModificare = office;

        const initialState = {
            //title: 'Aggiungi contatto ',
            //codiceUfficioPrecedente: office.codiceUfficio
        };

        this.ufficiModal = this.modalService.show(ElencoUfficiComponent, { initialState, class: 'gray modal-lg m-auto', backdrop: 'static' });
    }

}
