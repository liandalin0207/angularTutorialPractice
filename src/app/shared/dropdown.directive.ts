import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {
    @HostBinding('style.backgroundColor') backgroundColor = 'transparent';

    @HostListener('click') toggleOpen() {
        if (this.backgroundColor  === 'yellow') {
            this.backgroundColor = 'transparent';
        } else {
            this.backgroundColor = 'yellow';
        }
    }
}