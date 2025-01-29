import { Injectable, signal, Signal } from '@angular/core'

@Injectable({
    providedIn: 'root',
})
export class LoaderService {
    constructor() {}

    isLoading = signal(false)

    showLoader(): void {
        this.isLoading.set(true)
    }
    hideLoader(): void {
        this.isLoading.set(false)
    }
}
