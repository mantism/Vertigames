import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $insertNodes, COMMAND_PRIORITY_EDITOR, createCommand, DecoratorNode, LexicalCommand, LexicalEditor, TextNode } from "lexical";
import { useEffect } from "react";
import { $createTrickAutoCompleteNode, TrickAutoCompleteNode } from "../nodes/TrickAutoCompleteNode";

type CommandPayload = string;
export const INSERT_TRICK_AUTOCOMPLETE_COMMAND: LexicalCommand<CommandPayload> =
  createCommand('INSERT_TRICK_AUTOCOMPLETE_COMMAND');

export default function TrickAutoCompletePlugin(props: {tricks: string[]}) {
  const [editor] = useLexicalComposerContext();
  const {tricks} = props;

  useEffect(() => {
    // Similar with command listener, which returns unlisten callback
    const removeListener = editor.registerCommand(
      INSERT_TRICK_AUTOCOMPLETE_COMMAND,
      (payload) => {
        // Adding custom command that will be handled by this plugin
        editor.update(() => {
          $insertNodes([$createTrickAutoCompleteNode(tricks)]);
        });

        // Returning true indicates that command is handled and no further propagation is required
        return true;
      },
      COMMAND_PRIORITY_EDITOR,
    );

    return () => {
      removeListener();
    };
    /*const removeTransform = editor.registerNodeTransform(
      TextNode,
      (node: TextNode) => {
        const textContent = node.getTextContent();
        if (textContent.indexOf('/t') >= 0) {
          node.setTextContent(textContent.replace('/t', ''));
          const trickAutoCompleteNode = $createTrickAutoCompleteNode(tricks);
          console.log(trickAutoCompleteNode);
          //trickAutoCompleteNode.createDOM({namespace: 'ChallengeEditor', theme: configTheme});
        }
      });

    return () => {
      removeTransform();
    };*/

  }, [editor, tricks]);

  return null;
}