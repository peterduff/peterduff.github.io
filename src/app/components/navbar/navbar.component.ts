import {Component, OnInit} from '@angular/core';
// @ts-ignore
import packageJson from 'package.json';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    version: string = packageJson.version;

    constructor() {
    }

    ngOnInit(): void {
    }

}
