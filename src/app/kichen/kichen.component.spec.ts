import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KichenComponent } from './kichen.component';

describe('KichenComponent', () => {
  let component: KichenComponent;
  let fixture: ComponentFixture<KichenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KichenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KichenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
