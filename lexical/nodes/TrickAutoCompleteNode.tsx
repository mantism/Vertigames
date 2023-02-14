import { DecoratorNode, EditorConfig, LexicalEditor } from 'lexical';
import { ReactNode } from 'react';
import TrickAutoComplete from '../../components/TrickAutoComplete';

export class TrickAutoCompleteNode extends DecoratorNode<ReactNode> {
  __tricks: string[];
  
  constructor(tricks: string[], key?: string) {
    super(key);
    this.__tricks = tricks;
  }

  static getType(): string {
    return 'inline-autocomplete';
  }

  static clone(node: TrickAutoCompleteNode): TrickAutoCompleteNode {
    return new TrickAutoCompleteNode(node.__tricks, node.__key);
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
    const div = document.createElement('div');
    div.style.display = 'inline-autocomplete';
    return div;
  }

  updateDOM(): boolean {
    return false;
  }

  decorate(editor: LexicalEditor, config: EditorConfig): ReactNode {
    //editor.getDecorators().add(this, this.__tricks);
    return <TrickAutoComplete tricks={this.__tricks}/>;
  }
}

export function $createTrickAutoCompleteNode(tricks: string[]): TrickAutoCompleteNode {
  return new TrickAutoCompleteNode(tricks);
}

export function $isTrickAutoCompleteNode(node: any): boolean {
  return node instanceof TrickAutoCompleteNode;
}
