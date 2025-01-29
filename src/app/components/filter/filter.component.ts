import { Component, inject, input, OutputEmitterRef, output } from '@angular/core'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { CommonModule } from '@angular/common'
import { Options } from '../../utils/filters.utils'
import { FilterService } from '../../services/filter.service'

@Component({
    selector: 'app-filter',
    standalone: true,
    imports: [CommonModule, MatFormFieldModule, MatSelectModule],
    templateUrl: './filter.component.html',
    styleUrl: './filter.component.css',
})
export class FilterComponent<T> {
    options = input.required<Options<T>>()
    context = input<'filter' | 'sort'>('filter')
    filterService = inject(FilterService)

    onFilterChange(value: string) {
        if (this.context() === 'filter') {
            this.filterService.updateTypeFilter(value)
        } else {
            this.filterService.updateAttackFilter(value)
        }
    }
}
