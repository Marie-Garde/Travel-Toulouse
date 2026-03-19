import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Role } from '../../models/user.model';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  roles: { value: Role; label: string; description: string }[] = [
    { value: 'GUEST', label: 'Voyageur', description: 'Je cherche un logement' },
    { value: 'HOST', label: 'Hôte', description: 'Je propose un logement' },
    { value: 'BOTH', label: 'Les deux', description: 'Je voyage et j\'héberge' },
  ];

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    role: ['GUEST' as Role, Validators.required],
  });

  loading = signal(false);
  error = signal<string | null>(null);

  selectRole(role: Role): void {
    this.form.controls.role.setValue(role);
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.loading.set(true);
    this.error.set(null);

    const { firstName, lastName, email, password, role } = this.form.value;

    this.authService.register({
      firstName: firstName!,
      lastName: lastName!,
      email: email!,
      password: password!,
      role: role! as Role,
    }).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => {
        this.error.set(err.error?.error ?? 'Une erreur est survenue');
        this.loading.set(false);
      },
    });
  }
}
