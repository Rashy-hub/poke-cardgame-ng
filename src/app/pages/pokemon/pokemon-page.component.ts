import { Component, inject, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { PokemonType } from '../../utils/pokemon.utils'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { MatCardModule } from '@angular/material/card'
import { MatInputModule } from '@angular/material/input'
import { Pokemon } from '../../models/pokemon.model'
import { CommonModule } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'
import { ActivatedRoute, Router } from '@angular/router'
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card.component'
import { PokemonService } from '../../services/pokemon.service'

@Component({
    selector: 'app-pokemon',
    standalone: true,
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        PokemonCardComponent,
    ],
    templateUrl: './pokemon-page.component.html',
    styleUrls: ['./pokemon-page.component.css'],
})
export class PokemonPageComponent implements OnInit {
    pokemonForm: FormGroup
    pokemonTypes = Object.values(PokemonType)
    activatedRoute = inject(ActivatedRoute)
    pokemonService = inject(PokemonService)
    router = inject(Router)
    isUpdatePokemon: boolean = false
    currentId: number = -1
    pokemon: Pokemon = new Pokemon()

    constructor(private fb: FormBuilder) {
        this.pokemonForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            image: ['https://assets.pokemon.com/assets/cms2/img/pokedex/detail/125.png', [Validators.required]],
            type: [PokemonType.Electric, [Validators.required]],
            hp: [0, [Validators.required, Validators.min(0)]],
            figureCaption: ['', [Validators.required]],
            attackName: ['', [Validators.required]],
            attackStrength: [0, [Validators.required, Validators.min(0)]],
            attackDescription: ['', [Validators.required]],
        })
    }
    ngOnInit(): void {
        this.currentId = this.activatedRoute.snapshot.params['id']
        if (this.activatedRoute.snapshot.params['id']) {
            this.isUpdatePokemon = true
            //call service and get pokemon by id
            this.pokemonService.getPokemon(this.activatedRoute.snapshot.params['id']).subscribe((pokemon) => {
                this.pokemon = pokemon

                this.pokemonForm.patchValue(pokemon)
            })
        }
        this.pokemonForm.valueChanges.subscribe((value) => {
            this.pokemon = structuredClone(value)

            // Loguer les erreurs en direct
            Object.keys(this.pokemonForm.controls).forEach((key) => {
                const controlErrors = this.pokemonForm.get(key)?.errors
                if (controlErrors) {
                    console.log(`Errors in ${key}:`, controlErrors)
                }
            })
        })
    }
    onSubmit() {
        if (this.pokemonForm.valid && !this.isUpdatePokemon) {
            this.createPokemon()
        } else if (this.pokemonForm.valid && this.isUpdatePokemon) {
            this.updatePokemon()
        } else {
            console.log('Form is invalid')
        }
    }

    private updatePokemon(): void {
        this.pokemonService.updatePokemon({ id: this.currentId, ...this.pokemon } as Pokemon).subscribe((pokemon) => {
            this.router.navigateByUrl('/pokemons')
        })
    }
    private createPokemon(): void {
        this.pokemonService.createPokemon(this.pokemonForm.value as Pokemon).subscribe((pokemon) => {
            this.pokemonForm.reset()
            this.router.navigateByUrl('/pokemons')
        })
    }

    public deletePokemon() {
        console.log('deleting pokemon')
        this.pokemonService.deletePokemon(this.currentId.toString()).subscribe((pokemon) => {
            this.router.navigateByUrl('/pokemons')
        })
    }
    goBack() {
        this.router.navigateByUrl('/pokemons')
    }
}
