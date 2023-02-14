import { DecoratorNode, EditorConfig, LexicalEditor } from 'lexical';
import { ReactNode } from 'react';
import TrickAutoComplete from '../../components/TrickAutoComplete';

export class TrickAutoCompleteNode extends DecoratorNode<ReactNode> {
  __tricks: string[];
  
  constructor(tricks: string[]) {
    super('inline-autocomplete');
    console.log('constructing autocomplete node');
    this.__tricks = tricks;
    console.log('ummm');
  }

  static getType(): string {
    return 'inline-autocomplete';
  }

  static clone(node: TrickAutoCompleteNode): TrickAutoCompleteNode {
    console.log('cloning autocomplete node');
    return new TrickAutoCompleteNode(node.__tricks);
  }

  static isInline() {
    return true;
  }

  static isKeyboardSelectable() {
    return true;
  }

  static isIsolated() {
    return true;
  }

  createDOM(config: EditorConfig): HTMLElement {
    console.log('creating dom for autocomplete node');
    const div = document.createElement('div');
    div.style.display = 'inline-autocomplete';
    return div;
  }

  updateDOM(): boolean {
    return true;
  }

  decorate(editor: LexicalEditor, config: EditorConfig): ReactNode {
    console.log('decorating autocomplete node');
    return <TrickAutoComplete tricks={this.__tricks}/>;
  }
}

export function $createTrickAutoCompleteNode(tricks: string[]): TrickAutoCompleteNode {
  console.log('creating autocomplete node');
  return new TrickAutoCompleteNode(tricks);
}

export function $isTrickAutoCompleteNode(node: any): boolean {
  return node instanceof TrickAutoCompleteNode;
}
