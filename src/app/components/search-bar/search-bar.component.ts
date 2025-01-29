import { Component, model, output } from '@angular/core'

import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

@Component({
    selector: 'app-search-bar',
    imports: [CommonModule, FormsModule],
    templateUrl: './search-bar.component.html',
    styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
    searchedTerm = model<string>('')
    searchClicked = output<string>()
    onSearchTermChange(searchTerm: string) {
        // console.log(typeof searchTerm)
        this.searchClicked.emit(searchTerm)
    }
}
