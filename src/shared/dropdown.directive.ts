import { Directive, ElementRef, HostBinding, Input, Renderer2 ,HostListener} from "@angular/core";

@Directive({
  selector : '[appDropDown]'
})

export class DropdownDirective { 
  value : boolean = false
  @HostBinding('class.open') click : boolean = this.value
  constructor (private elementRef : ElementRef, private renderer : Renderer2) { }

  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.click = this.elementRef.nativeElement.contains(event.target) ? !this.click : false;
  }

}
