import { Renderer } from '../infrastructure/renderer';
import { AppComponent } from './app.component';
import { HeaderComponent } from '../infrastructure/components/header.component';

const renderer = new Renderer();

renderer.registerComponent('header', HeaderComponent)

renderer.render(document.body, AppComponent);