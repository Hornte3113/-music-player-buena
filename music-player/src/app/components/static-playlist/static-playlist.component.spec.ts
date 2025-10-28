import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticPlaylistComponent } from './static-playlist.component';

describe('StaticPlaylistComponent', () => {
  let component: StaticPlaylistComponent;
  let fixture: ComponentFixture<StaticPlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaticPlaylistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaticPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
