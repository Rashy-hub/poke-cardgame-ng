import { Component, inject, OnInit, Signal } from '@angular/core'
import { MatCardModule } from '@angular/material/card'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { CommonModule } from '@angular/common'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { LoginService } from '../../services/login.service'
import { ServerStatusService } from '../../services/server-status.service'

@Component({
    selector: 'app-login-page',
    imports: [CommonModule, MatCardModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule],
    standalone: true,
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.css',
})
export class LoginPageComponent implements OnInit {
    private formBuilder = inject(FormBuilder)
    private loginService = inject(LoginService)
    private serverStatus = inject(ServerStatusService)
    status: Signal<'ONLINE' | 'LOADING' | 'UNREACHABLE'> = this.serverStatus.status
    mainForm!: FormGroup
    intevalCheckStatus!: any
    invalidCredentails: boolean = false

    constructor() {}
    ngOnInit(): void {
        this.initForm()
        console.log('login page loaded')
        this.serverStatus.checkStatus()
        if (this.status() === 'UNREACHABLE') this.intevalCheckStatus = setInterval(() => this.serverStatus.checkStatus(), 5000)
    }

    initForm(): void {
        this.mainForm = this.formBuilder.group({
            username: ['johndoe', [Validators.required, Validators.minLength(3)]],
            password: [
                'test123+',
                [
                    Validators.required,
                    Validators.pattern(
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/
                    ),
                ],
            ],
        })
    }
    onSubmitForm(): void {
        clearInterval(this.intevalCheckStatus)
        console.log(this.mainForm.value)
        this.loginService.login(this.mainForm.value).subscribe({
            next: (result) => {
                if (result) this.invalidCredentails = false
                if (!result) this.invalidCredentails = true
            },
        })
    }
}
