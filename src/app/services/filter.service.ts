import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class FilterService {
    private typeFilter = new BehaviorSubject<string>('')
    private attackFilter = new BehaviorSubject<string>('ASC')

    typeFilter$ = this.typeFilter.asObservable()
    attackFilter$ = this.attackFilter.asObservable()

    updateTypeFilter(value: string): void {
        this.typeFilter.next(value)
    }

    updateAttackFilter(value: string): void {
        this.attackFilter.next(value)
    }
}
