import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CriarItemPedidoComponent } from './criar-item-pedido.component';

describe('CriarItemPedidoComponent', () => {
  let component: CriarItemPedidoComponent;
  let fixture: ComponentFixture<CriarItemPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarItemPedidoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CriarItemPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
