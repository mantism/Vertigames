import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { KEY_ENTER_COMMAND, COMMAND_PRIORITY_EDITOR, RangeSelection } from "lexical";
import {$getRoot, $getSelection} from 'lexical';

export default function ChallengeCreatorPlugin() {
  const [editor] = useLexicalComposerContext();
  editor.registerCommand(KEY_ENTER_COMMAND, (payload: KeyboardEvent) => {
    const root = $getRoot();
    const selection = $getSelection();

    if ((selection as RangeSelection).anchor) {
      const key = (selection as RangeSelection).anchor!.key;
      const textNodes = root.getAllTextNodes();
      const prevNode = textNodes.find(node => node.getKey() === key);
      console.log(prevNode.getTextContent());
    }
    return true;
  },COMMAND_PRIORITY_EDITOR);
  return null;
}