import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { LoginService } from '../services/login.service'
import { LoaderService } from '../services/loader.service'
import { finalize } from 'rxjs'

export const authGuard: CanActivateFn = (route, state) => {
    const loginService = inject(LoginService)
    const loaderService = inject(LoaderService)

    const router = inject(Router)
    const token = localStorage.getItem('token')

    if (!token) {
        console.log('NO token found')
        router.navigateByUrl('/login')
        return false
    } else if (!loginService.userStatus() && token) {
        console.log('NO user status found')
        loaderService.showLoader()
        loginService.checkStatus(token).subscribe()
        // router.navigateByUrl('/login')

        return false
    }
    return true
}
