import { Component, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Property } from '../../models/property.model';

@Component({
  selector: 'app-property-card',
  imports: [CurrencyPipe],
  templateUrl: './property-card.html',
  styleUrl: './property-card.scss',
})
export class PropertyCardComponent {
  property = input.required<Property>();

  get primaryImage() {
    const imgs = this.property().images;
    return imgs.find((i) => i.isPrimary) ?? imgs[0] ?? null;
  }

  get visibleAmenities() {
    return this.property().amenities.slice(0, 3);
  }

  get extraAmenitiesCount() {
    return Math.max(0, this.property().amenities.length - 3);
  }
}
