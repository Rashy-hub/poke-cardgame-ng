import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { inject, Injectable, signal } from '@angular/core'
import { catchError, finalize, tap } from 'rxjs'
import { environment } from '../../environment/environment'
import { LoaderService } from './loader.service'

interface ServerStatus {
    status: 'ONLINE' | 'LOADING' | 'UNREACHABLE'
}

@Injectable({
    providedIn: 'root',
})
export class ServerStatusService {
    constructor() {}
    status = signal<'ONLINE' | 'LOADING' | 'UNREACHABLE'>('UNREACHABLE')
    httpClient = inject(HttpClient)
    loaderService = inject(LoaderService)

    checkStatus(): void {
        this.status.set('LOADING')
        this.loaderService.showLoader()
        this.httpClient
            .get<void>(environment.BASE_URL + '/monsters/', { observe: 'response' })
            .pipe(
                tap((response) => {
                    this.status.set('ONLINE')
                }),
                catchError((error: HttpErrorResponse) => {
                    if (error.status === 0) {
                        console.error('Server unreachable or network issue:', error.message)
                        this.status.set('UNREACHABLE')
                    } else {
                        console.error('HTTP error:', error.message)
                        this.status.set('ONLINE')
                    }
                    throw error
                }),
                finalize(() => {
                    this.loaderService.hideLoader()
                })
            )
            .subscribe({
                error: (err) => {
                    console.log('Error handler in subscribe:', err.message)
                },
            })
    }
}
