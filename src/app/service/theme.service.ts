import { Injectable } from '@angular/core';

/**
 * SOURCE:
 * https://github.com/jfhr/ngb-theme-switcher-example/tree/main
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  public static default = 'default';

  public get current(): string {
  	return localStorage.getItem('theme') ?? ThemeService.default;
  }

  public set current(value: string) {
  	localStorage.setItem('theme', value);
  	this.style.href = `${value}.css`;
  }

  private readonly style: HTMLLinkElement;

  constructor() {
    this.style = document.createElement('link');
    this.style.rel = 'stylesheet';
    document.head.appendChild(this.style);

    if (localStorage.getItem('theme') !== undefined) {
      // this.style.type = "text/cs"
    	this.style.href = `${this.current}.css`;
    }
  }
}
