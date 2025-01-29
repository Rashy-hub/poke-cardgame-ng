import { Component, effect, inject, OnInit, Signal } from '@angular/core'
import { LoginService } from '../../services/login.service'
import { User } from '../../models/user.mode'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'
import { ProgressBarService } from '../../services/progress-bar.service'
import { FullNamePipe } from '../../pipes/fullname-user.pipe'

@Component({
    selector: 'app-header',
    imports: [CommonModule, FullNamePipe],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
    loginService = inject(LoginService)
    router = inject(Router)
    progressBarService = inject(ProgressBarService)
    userStatus: Signal<User | null | undefined> = this.loginService.userStatus
    progressBar: Signal<number> = this.progressBarService.progressBar

    ngOnInit(): void {}

    login(): void {
        console.log('Attempting to login...')
        this.loginService.login({ username: 'johndoe', password: 'test123+' }).subscribe((user) => {
            console.log('Login result:', user)
        })
    }

    logout(): void {
        this.loginService.logout().subscribe((success) => {
            console.log(success)
            if (success) {
                this.router.navigateByUrl('/login')
            } else {
                console.log('Logout failed')
            }
        })
    }
}
