import { ElementRef, Renderer2 } from "@angular/core";

export type ApplyStylesParams = {
  renderer: Renderer2;
  elementRef: ElementRef;
  styles: { [key: string]: string };
};
