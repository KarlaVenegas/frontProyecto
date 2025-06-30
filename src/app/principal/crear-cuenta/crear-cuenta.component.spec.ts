import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CrearCuentaComponent } from './crear-cuenta.component';
import { CafeteriaService } from '../../services/cafeteria.service';
import { Router } from '@angular/router';

describe('CrearCuentaComponent', () => {
  let component: CrearCuentaComponent;
  let fixture: ComponentFixture<CrearCuentaComponent>;
  let cafeteriaService: CafeteriaService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, RouterTestingModule],
      declarations: [CrearCuentaComponent],
      providers: [CafeteriaService]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearCuentaComponent);
    component = fixture.componentInstance;
    cafeteriaService = TestBed.inject(CafeteriaService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form for cafeteria', () => {
    component.seleccionar('cafeteria');
    expect(component.form).toBeTruthy();
    expect(component.form?.contains('nombreCafeteria')).toBeTrue();
    expect(component.form?.contains('ubicacion')).toBeTrue();
    expect(component.form?.contains('correo')).toBeTrue();
  });

  it('should validate required fields', () => {
    component.seleccionar('cafeteria');
    const form = component.form;

    if (form) {
      form.setValue({
        nombreCafeteria: '',
        ubicacion: '',
        horarioApertura: '',
        horarioCierre: '',
        correo: '',
        contrasena: '',
        imagen: null
      });

      expect(form.valid).toBeFalse();
      expect(form.get('nombreCafeteria')?.errors?.['required']).toBeTruthy();
      expect(form.get('ubicacion')?.errors?.['required']).toBeTruthy();
      expect(form.get('correo')?.errors?.['required']).toBeTruthy();
      expect(form.get('contrasena')?.errors?.['required']).toBeTruthy();
    }
  });

  it('should call cafeteriaService when submitting valid form', () => {
    spyOn(cafeteriaService, 'registrarCafeteria').and.callThrough();
    spyOn(router, 'navigate');

    component.seleccionar('cafeteria');

    if (component.form) {
      component.form.setValue({
        nombreCafeteria: 'Test Cafeteria',
        ubicacion: 'Test Location',
        horarioApertura: '08:00',
        horarioCierre: '18:00',
        correo: 'test@example.com',
        contrasena: 'password123',
        imagen: null
      });

      const mockFile = new File([''], 'test.jpg', { type: 'image/jpeg' });
      component.selectedFile = mockFile;

      component.enviar();

      expect(cafeteriaService.registrarCafeteria).toHaveBeenCalled();
    }
  });
});
