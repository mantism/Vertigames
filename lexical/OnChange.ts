import {$getRoot, $getSelection, $isNodeSelection, $isRangeSelection, $isTextNode, EditorState, LexicalEditor} from 'lexical';
import { $createTrickAutoCompleteNode } from './nodes/TrickAutoCompleteNode';
import { TrickNode } from './nodes/TrickNode';
import { INSERT_TRICK_AUTOCOMPLETE_COMMAND } from './plugins/TrickAutoCompletePlugin';
// When the editor changes, you can get notified via the
// LexicalOnChangePlugin!
export default function onChange(editorState: EditorState, editor: LexicalEditor) {
  
  editorState.read(() => {
    // Read the contents of the EditorState here.
    const root = $getRoot();
    const selection = $getSelection();
    /*if (selection && $isRangeSelection(selection)) {
      const nodes = selection.getNodes();
      if ($isTextNode(nodes[0])) {
        const textContent = nodes[0].getTextContent();
        if (textContent.indexOf('/t') >= 0) {
          textContent.replace('/t', '');
          //selection.deleteLine(false);
          nodes[0].setTextContent(textContent);
          
          editor.dispatchCommand(INSERT_TRICK_AUTOCOMPLETE_COMMAND, 'TEST');
        }
      }
    }*/
  });

  editor.update(() => {
    const selection = $getSelection();
    if (selection && $isRangeSelection(selection)) {
      const nodes = selection.getNodes();
      if ($isTextNode(nodes[0])) {
        const textContent = nodes[0].getTextContent();
        if (textContent.indexOf('/t') >= 0) {
          textContent.replace('/t', '');
          selection.deleteLine(false);
          nodes[0].setTextContent(textContent);
          editor.dispatchCommand(INSERT_TRICK_AUTOCOMPLETE_COMMAND, 'TEST');
        }
      }
    }
  });

}