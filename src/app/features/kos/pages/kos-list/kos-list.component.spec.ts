import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KosListComponent } from './kos-list.component';

describe('KosListComponent', () => {
  let component: KosListComponent;
  let fixture: ComponentFixture<KosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KosListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
