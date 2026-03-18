import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { PropertyService } from '../../services/property.service';
import { Property } from '../../models/property.model';
import { HeaderComponent } from '../../components/header/header';

@Component({
  selector: 'app-property-detail',
  imports: [RouterLink, CurrencyPipe, HeaderComponent],
  templateUrl: './property-detail.html',
  styleUrl: './property-detail.scss',
})
export class PropertyDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly propertyService = inject(PropertyService);

  property = signal<Property | null>(null);
  loading = signal(true);
  notFound = signal(false);
  activeImageIndex = signal(0);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.propertyService.getProperty(id).subscribe({
      next: (data) => {
        this.property.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.notFound.set(true);
        this.loading.set(false);
      },
    });
  }

  setActiveImage(index: number): void {
    this.activeImageIndex.set(index);
  }

  get activeImage() {
    const imgs = this.property()?.images ?? [];
    return imgs[this.activeImageIndex()] ?? imgs[0] ?? null;
  }
}
