import { 
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Inject,
  Injectable,
  Injector
} from '@angular/core';
import {
  ComponentType,
  Portal,
  ComponentPortal,
  DomPortalHost
} from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/platform-browser'
import { DigitalTourComponent } from '../client/venue/digital-tour/digital-tour.component';

@Injectable()
export class DigitalTourService {

  private digitalTourPortal: ComponentPortal<DigitalTourComponent>;

  private bodyPortalHost: DomPortalHost;

  constructor(
    @Inject(DOCUMENT) private document: any,
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) { 
    this.digitalTourPortal = new ComponentPortal(DigitalTourComponent);

    this.bodyPortalHost = new DomPortalHost(document.body, this.componentFactoryResolver, this.appRef, this.injector);
  }

  show() {
    const componentRef: ComponentRef<DigitalTourComponent> = this.bodyPortalHost.attach(this.digitalTourPortal);

    componentRef.instance.close.subscribe(() => this.hide())
  }

  hide() {
    this.bodyPortalHost.detach();
  }
}
