import { TextNode, EditorConfig, SerializedTextNode, EditorThemeClasses } from "lexical";

export class EmoticonNode extends TextNode {
  __className: string;

  constructor(className: string, text: string, key?: string) {
    super(text, key);
    this.__className = className;
  }

  static getType(): string {
    return 'emoticon';
  }

  static clone(node: EmoticonNode) {
    return new EmoticonNode(node.__className, node.__text, node.__key);
  }

  createDOM(config: EditorConfig) {
    const dom = document.createElement("span");
    const inner = super.createDOM(config);
    dom.className = this.__className;
    inner.className = "emoticon-inner";
    dom.appendChild(inner);
    return dom;
  }

  updateDOM(prevNode: TextNode, dom: { firstChild: any; }, config: { disableEvents: boolean; namespace: string; theme: EditorThemeClasses; }) {
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

  importJSON(json: SerializedTextNode): EmoticonNode {
    const node = super.importJSON(json);
    return new EmoticonNode(node.__text, node.__text, node.__key);
  }
}

export function $isEmoticonNode(node: TextNode) {
  return node instanceof EmoticonNode;
}

export function $createEmoticonNode(className: string, emoticonText: string) {
  return new EmoticonNode(className, emoticonText).setMode('token');
}