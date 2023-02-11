//EmoticonNode.js
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { TextNode} from 'lexical';
import { useEffect } from 'react';
import { $createEmoticonNode } from '../nodes/EmoticonNode';

function emoticonTransform(node: TextNode) {
  const textContent = node.getTextContent();
  console.log('emoticonTransform', textContent);
  if (textContent === ':)') {
    console.log('oh');
    node.replace($createEmoticonNode(':)', '🙂'));
  } else if (textContent === ':(') {
    node.replace($createEmoticonNode(':(', '🙁'));
  }
}

function useEmoticons(editor) {
  useEffect(() => {
    const removeTransform = editor.registerNodeTransform(
      TextNode,
      emoticonTransform,
    );
    return () => {
      removeTransform();
    };
  }, [editor]);
}

export default function EmoticonPlugin() {
  const [editor] = useLexicalComposerContext();
  useEmoticons(editor);
  return null;
}