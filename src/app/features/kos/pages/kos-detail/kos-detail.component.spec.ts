import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KosDetailComponent } from './kos-detail.component';

describe('KosDetailComponent', () => {
  let component: KosDetailComponent;
  let fixture: ComponentFixture<KosDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KosDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KosDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
