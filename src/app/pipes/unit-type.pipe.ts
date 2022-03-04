import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'unitType',
    pure: false
})
export class UnitTypePipe implements PipeTransform {

    transform(items: any[], unitType: string): any[] {
        if (!items) {
            return [];
        }
        if (!unitType) {
            return items;
        }

        items = items.filter(item => {
            return item.role === unitType;
        });

        return items;
    }
}
