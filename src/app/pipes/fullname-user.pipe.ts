import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'fullName',
})
export class FullNamePipe implements PipeTransform {
    transform(user: { firstName: string; lastName: string }): string {
        if (!user) {
            return ''
        }
        return `Welcome ${user.firstName} ${user.lastName}`
    }
}
