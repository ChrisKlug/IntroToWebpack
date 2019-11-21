import { IComponent } from '../infrastructure/interfaces';
import * as template from './app.component.html';

export class AppComponent implements IComponent {
    getTemplate(): string {
        return template;
    }
}