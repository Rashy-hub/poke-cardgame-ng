import { Component, inject, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { HeaderComponent } from './components/header/header.component'
import { LoginService } from './services/login.service'
import { LoaderComponent } from './components/loader/loader.component'
import { CommonModule } from '@angular/common'
import { LoaderService } from './services/loader.service'

@Component({
    selector: 'app-root',
    imports: [CommonModule, RouterOutlet, HeaderComponent, LoaderComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
    title = 'poke-cardgame-ng'
    loaderService = inject(LoaderService)

    ngOnInit(): void {}
}
