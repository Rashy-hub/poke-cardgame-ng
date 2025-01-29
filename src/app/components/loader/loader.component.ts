import { Component, inject } from '@angular/core'
import { LoaderService } from '../../services/loader.service'
import { CommonModule } from '@angular/common'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

@Component({
    selector: 'app-loader',
    imports: [CommonModule, MatProgressSpinnerModule],
    templateUrl: './loader.component.html',
    styleUrl: './loader.component.css',
})
export class LoaderComponent {
    loaderService = inject(LoaderService)
}
