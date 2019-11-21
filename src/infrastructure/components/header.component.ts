import { IComponent } from '../interfaces';

export class HeaderComponent implements IComponent {
    getTemplate(): string {
        return `
        <h1>
            {{#if text}}
                {{text}}
            {{else}}
                Hello World!
            {{/if}}
        </h1>
        `;
    }
}