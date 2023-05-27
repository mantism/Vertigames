import { DecoratorNode, EditorConfig, LexicalEditor, TextNode } from 'lexical';
import { ReactNode } from 'react';
import TrickAutoComplete from '../../components/TrickAutoComplete';

export class TrickAutoCompleteNode extends TextNode {
  __tricks: string[];
  __className: string;
  
  constructor(tricks: string[], className: string, key?: string) {
    super(key);
    this.__tricks = tricks;
    this.__className = className;
  }

  static getType(): string {
    return 'inline-autocomplete';
  }

  static clone(node: TrickAutoCompleteNode): TrickAutoCompleteNode {
    return new TrickAutoCompleteNode(node.__tricks, node.__className, node.__key);
  }

  createDOM(config: EditorConfig): HTMLElement {
    const div = document.createElement('div');
    const inner = super.createDOM(config);
    div.className = this.__className;
    inner.className = 'autocomplete-inner';
    div.appendChild(inner);
    return div;
  }

  updateDOM(prevNode: TextNode, dom: { firstChild: any;}, config: EditorConfig): boolean {
    return false;
  }

  /*decorate(editor: LexicalEditor, config: EditorConfig): ReactNode {
    //editor.getDecorators().add(this, this.__tricks);
    return <TrickAutoComplete tricks={this.__tricks}/>;
  }*/
}

export function $createTrickAutoCompleteNode(tricks: string[], className: string): TrickAutoCompleteNode {
  return new TrickAutoCompleteNode(tricks, className);
}

export function $isTrickAutoCompleteNode(node: any): boolean {
  return node instanceof TrickAutoCompleteNode;
}
