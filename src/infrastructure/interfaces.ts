export type IComponentConstructor = (new () => IComponent);

export interface IComponent {
    getTemplate(): string;
}

export interface IBindingComponent extends IComponent {
    bind(element: HTMLElement, attributes: IAttributes);
}

export interface IAttributes {
    [name: string]:string
}

export interface IComponentDefinition {
    name: string;
    component: IComponentConstructor;
}