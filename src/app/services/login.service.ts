import { inject, Injectable, signal } from '@angular/core'
import { catchError, map, Observable, of, tap } from 'rxjs'
import { User } from '../models/user.mode'
import { HttpClient, HttpResponse } from '@angular/common/http'
import { environment } from '../../environment/environment'
import { Router } from '@angular/router'
import { ProgressBarService } from './progress-bar.service'

interface Credentials {
    username: string
    password: string
}

interface ErrorResponse {
    detail: string
}

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    private httpClient = inject(HttpClient)
    private router = inject(Router)
    private progressBarService = inject(ProgressBarService)
    userStatus = signal<User | null | undefined>(undefined) // null means not logged in, undefined means loading

    constructor() {}

    login(credentials: Credentials): Observable<User | null> {
        this.progressBarService.startProgress()

        return this.httpClient.post<User | null>(environment.BASE_URL + '/sessions/login/', credentials).pipe(
            tap((user) => {
                this.progressBarService.completeProgress()

                if (user) {
                    localStorage.setItem('token', user.token)
                    this.userStatus.set(user)
                    this.router.navigateByUrl('/pokemons')
                }
            }),
            catchError((err) => {
                this.progressBarService.resetProgress()
                console.error('Erreur lors de la connexion', err)
                return of(null)
            })
        )
    }

    checkStatus(token: string): Observable<User | ErrorResponse | null> {
        console.log('check status')
        const headers = { Authorization: `Token ${token}` }
        return this.httpClient.get<User | ErrorResponse | null>(environment.BASE_URL + '/sessions/me/', { headers }).pipe(
            tap({
                next: (result) => {
                    console.log('result', result)
                    if (result) {
                        this.userStatus.set(result as User)
                        console.log('User status ', this.userStatus())
                        this.router.navigateByUrl('/pokemons')
                    }
                },
                error: (err) => {
                    this.userStatus.set(null)
                    console.log('Erreur lors de la récupération du statut utilisateur ', err)
                    this.router.navigateByUrl('/login')
                },
            })
        )
    }

    logout(): Observable<boolean> {
        const token = localStorage.getItem('token')

        if (token) {
            const headers = { Authorization: `Token ${token}` }

            return this.httpClient.get<void>(environment.BASE_URL + '/sessions/logout/', { headers, observe: 'response' }).pipe(
                tap((response) => {
                    if (response.status === 204) {
                        localStorage.removeItem('token')
                        this.userStatus.set(null)
                    }
                }),
                map(() => true),
                catchError((error) => {
                    console.error('Erreur de déconnexion', error)
                    return of(false)
                })
            )
        } else {
            return of(false)
        }
    }
}
