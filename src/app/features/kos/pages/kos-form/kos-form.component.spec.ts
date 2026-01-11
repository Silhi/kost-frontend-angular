import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KosFormComponent } from './kos-form.component';

describe('KosFormComponent', () => {
  let component: KosFormComponent;
  let fixture: ComponentFixture<KosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KosFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
