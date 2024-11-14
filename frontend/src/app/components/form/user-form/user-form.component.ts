import { Component } from '@angular/core';
import { IUser } from '../../../models/IUser';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faPlusCircle, faTrashAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { AppState } from '../../../store/states/app.state';
import { Store } from '@ngrx/store';
import { selectProfile, selectUtenteDaModificare } from '../../../store/selectors/users.selector';
import { NgForOf } from '@angular/common';
import { IProfili } from '../../../models/IProfili';

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
    user: IUser | null = null;

    profileList$ = this._storeApp$.select(selectProfile);
    profileList: Array<IProfili> = [];

    userForm: FormGroup;

    constructor(private _storeApp$: Store<AppState>, public modal: BsModalRef, private fb: FormBuilder) {
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
    }

    onSubmit() { }

    onDelClick(id: number) { }

    onEditClick(user: IUser) { }

    onAddClick() { }
}
