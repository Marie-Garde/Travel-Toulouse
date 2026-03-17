import { Component, HostListener, OnInit, inject, signal } from '@angular/core';
import { PropertyService } from '../../services/property.service';
import { Property } from '../../models/property.model';
import { PropertyCardComponent } from '../../components/property-card/property-card';

@Component({
  selector: 'app-home',
  imports: [PropertyCardComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent implements OnInit {
  private readonly propertyService = inject(PropertyService);

  properties = signal<Property[]>([]);
  loading = signal(true);
  scrolled = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 60);
  }

  ngOnInit(): void {
    this.propertyService.getProperties().subscribe({
      next: (data) => {
        this.properties.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }
}
