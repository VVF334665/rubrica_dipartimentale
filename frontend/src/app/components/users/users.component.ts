import { Component } from '@angular/core';
import { AppState } from '../../store/states/app.state';
import { Store } from '@ngrx/store';
import { IUser } from '../../models/IUser';
import { selectUsersList } from '../../store/selectors/users.selector';
import { DelUser, SetUserDaModificare, UsersActionType } from '../../store/actions/users.action';
import { NgFor } from '@angular/common';
import { faEdit, faPlusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserFormComponent } from '../form/user-form/user-form.component';

@Component({
    selector: 'vvfrubrica-users',
    standalone: true,
    imports: [NgFor, FontAwesomeModule],
    templateUrl: './users.component.html',
    styleUrl: './users.component.css'
})
export class UsersComponent {
    faPlusCircle = faPlusCircle;
    faEdit = faEdit;
    faTrashAlt = faTrashAlt;

    usersList$ = this._storeApp$.select(selectUsersList);
    usersList: Array<IUser> = [];

    modalUSers?: BsModalRef | null;

    constructor(private _storeApp$: Store<AppState>, private modalService: BsModalService) { }

    ngOnInit(): void {
        this._storeApp$.dispatch({ type: UsersActionType.GetUsers });

        this.usersList$.subscribe(items => {
            this.usersList = [...(items ?? [])]
        });
    }

    onAddClick() {
        const initialState = {
            title: 'Aggiungi Utente',
            list: []
        };

        this.openModal(initialState);
    }

    onEditClick(user: IUser) {
        const initialState = {
            title: 'Modifica Utente ',
            // user: user,
        };

        this._storeApp$.dispatch(SetUserDaModificare({ user: user }));

        this.openModal(initialState);
    }

    onDelClick(id: number) {
        if (confirm('Conferma cancellazione?')) {
            // let temp = this.usersList.find(user => user.id === id);
            this._storeApp$.dispatch(DelUser({ id: id }));
        }
    }

    openModal(initialState: object) {
        let config = {
            backdrop: true,
            // backdrop: 'static',
            ignoreBackdropClick: true,
            initialState, class: 'gray modal-xl',
        };

        this.modalUSers = this.modalService.show(UserFormComponent, config);
    }
}
