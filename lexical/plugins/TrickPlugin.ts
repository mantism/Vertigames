import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LexicalEditor, TextNode } from "lexical";
import { useEffect } from "react";
import { $createTrickNode, TrickNode } from "../nodes/TrickNode";

function trickTransform(node: TextNode) {
  const textContent = node.getTextContent().trimStart();
  const startIndex = textContent.indexOf("<");
  const endIndex = textContent.indexOf(">");
  const tricks = TrickNode.getTricks();
  if (startIndex >= 0 && endIndex > startIndex) {
    const substring = textContent.substring(startIndex + 1, endIndex);
    if (tricks && tricks.has(substring)) {
      node.setTextContent(textContent.substring(0, startIndex));
      node.insertAfter($createTrickNode(substring, substring), true);
      node.selectNext();
    }
  }
}

function useTricks(editor: LexicalEditor) {
  useEffect(() => {
    const removeTransform = editor.registerNodeTransform(
      TextNode,
      trickTransform,
    );
    return () => {
      removeTransform();
    };
  }, [editor]);
}

export default function TrickPlugin() {
  const [editor] = useLexicalComposerContext();
  useTricks(editor);
  return null;
}