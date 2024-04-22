@Component({
  selector: 'zippy',
  template: `
  <div class="zippy">
    <div (click)="toggle()">Toggle</div>
    <div [hidden]="!visible">
      <ng-content></ng-content>
    </div>
 </div>`})
export class Zippy {
  visible: boolean = true;
  @Output() open: EventEmitter<any> = new EventEmitter();
  @Output() close: EventEmitter<any> = new EventEmitter();
 
  toggle() {
    this.visible = !this.visible;
    if (this.visible) {
      this.open.emit("OPEN");
    } else {
      this.close.emit("CLOSE");
    }
  }
}

@Component({
  selector: 'app',
  template: `
    <zippy (open)="opened($event)" (close)="closed($event)"></zippy>
  `
})
class App {
  opened(message) {
    console.info(message) //-> OPEN
  };
  closed(message) {
    console.info(message) //-> CLOSE
  }
}