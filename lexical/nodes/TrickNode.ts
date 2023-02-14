import { EditorConfig, SerializedTextNode, TextNode } from "lexical";

export class TrickNode extends TextNode {
  __className: string;
  static __tricks: Set<string>;

  constructor(className: string, text: string, key?: string) {
    super(text, key);
    this.__className = className;
  }

  static getType(): string {
    return 'trick';
  }

  static clone(node: TrickNode) {
    return new TrickNode(node.__className, node.__text, node.__key);
  }

  static getTricks() {
    return this.__tricks;
  }

  static setTricks({ tricks }: { tricks: Set<string>; }) {
    this.__tricks = tricks;
  }

  createDOM(config: EditorConfig): HTMLElement {
    const dom = document.createElement("span");
    const inner = super.createDOM(config);
    dom.className = this.__className;
    inner.className = "trick-inner";
    dom.appendChild(inner);
    return dom;
  }

  updateDOM(prevNode: TextNode, dom: { firstChild: any; }, config: EditorConfig) {
    const inner = dom.firstChild;
    if (inner === null) {
      return true;
    }
    super.updateDOM(prevNode, inner, config);
    return false;
  }

  exportJSON(): SerializedTextNode {
    return {
      ...super.exportJSON(),
      text: this.__className,
    };
  }

  importJSON(json: SerializedTextNode): TrickNode {
    const node = super.importJSON(json);
    return new TrickNode(node.__text, node.__text, node.__key);
  }
};

export function $isTrickNode(node: TextNode) {
  return node instanceof TrickNode;
}

export function $createTrickNode(className: string, trickText: string) {
  return new TrickNode(className, trickText).setMode('token');
}