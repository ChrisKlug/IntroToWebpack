import * as I from './interfaces';
import * as Handlebars from 'handlebars';

export class Renderer {
    private components: { [name:string]: I.IComponentConstructor } = {};

    render(element: HTMLElement, component: I.IComponentConstructor|string, context?: {[name:string]:string}) {
        let cmp: I.IComponent;
        if (typeof component === "string") {
            cmp = new this.components[component]();
        } else {
            cmp = new component();
        }
        let template = cmp.getTemplate();

        let attrs = this.getAttributes(element);
        let el = this.createElement(template, attrs);

        this.parseSubComponents(el);

        element.appendChild(el);
        
        if (cmp["bind"]) {
            (<I.IBindingComponent>cmp).bind(el, attrs);
        }
    }

    registerComponent(name: string, component: I.IComponentConstructor) {
        this.components[name.toLocaleLowerCase()] = component;
    }

    private getAttributes(element: HTMLElement) {
        let attrs = {};
        for (let i=0; i<element.attributes.length; i++) {
            attrs[element.attributes[i].name] = element.attributes[i].value;
        }
        return attrs;
    }
    private createElement(template: string, context: any) {
        let tpl = Handlebars.compile(template);
        let html = tpl(context);
        let div = document.createElement("div");
        div.innerHTML = html;
        return <HTMLElement>div.firstElementChild;
    }
    
    private parseSubComponents(element: HTMLElement) {
        for (let i = 0; i<element.children.length; i++) {
            let name = element.children[i].tagName;
            if (this.components[name.toLocaleLowerCase()]) {
                this.render(<HTMLElement>element.children[i], this.components[name.toLocaleLowerCase()]);
            }
        }
    }
}