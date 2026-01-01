import { Component } from '@angular/core';

// selector: which element on the screen will be replaced by the component
// selector have to use dash to separate the words, to not conflict with the html tags
// template means the content of the component
// only very very short templates, we can use inline template, otherwise use templateUrl
// standalone: true, means the component is standalone, it it is set to false, it will be treated as a module component
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true, // angular 19 will be the default, so we can remove it
  styleUrl: './header.component.css', // or styleUrls: ['./header.component.css'] or styles,
})
export class HeaderComponent {}
