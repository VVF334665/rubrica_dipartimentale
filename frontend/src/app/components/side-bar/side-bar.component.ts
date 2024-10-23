import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLandmark, faBuilding, faUser as faUserSolid } from '@fortawesome/free-solid-svg-icons';
import { faUser as faUserRegular } from '@fortawesome/free-regular-svg-icons';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'vvfrubrica-side-bar',
    standalone: true,
    imports: [MatToolbarModule, MatButtonModule, FontAwesomeModule, RouterLink, RouterLinkActive],
    templateUrl: './side-bar.component.html',
    styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
    faLandmark = faLandmark;
    faBuilding = faBuilding;
    faUserRegular = faUserRegular;
    faUserSolid = faUserSolid;
}
