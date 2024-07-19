import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProtectedComponent } from './protected.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';

describe('ProtectedComponent', () => {
  let component: ProtectedComponent;
  let fixture: ComponentFixture<ProtectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProtectedComponent],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        MatCardModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
