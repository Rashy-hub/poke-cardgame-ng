import { Injectable, Signal, signal } from '@angular/core'

@Injectable({
    providedIn: 'root',
})
export class ProgressBarService {
    constructor() {}

    progressBar = signal(0)
    simulatedProgress: number = 0
    progressInterval!: any

    startProgress() {
        this.progressBar.set(0)
        this.simulatedProgress = 0
        this.progressInterval = setInterval(() => {
            this.simulatedProgress += 10
            console.log(this.simulatedProgress)
            if (this.simulatedProgress < 90) {
                this.progressBar.set(this.simulatedProgress)
            } else {
                clearInterval(this.progressInterval)
            }
        }, 200)
    }
    completeProgress() {
        console.log('completing progress')
        clearInterval(this.progressInterval)
        this.progressBar.set(100)
        setTimeout(() => this.progressBar.set(0), 500)
    }
    resetProgress() {
        console.log('resetting progress')
        clearInterval(this.progressInterval)
        this.progressBar.set(0)
    }
}
