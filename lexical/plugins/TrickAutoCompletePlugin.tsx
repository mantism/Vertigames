import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $insertNodes, COMMAND_PRIORITY_EDITOR, createCommand, DecoratorNode, LexicalCommand, LexicalEditor, TextNode } from "lexical";
import { useCallback, useEffect } from "react";
import { $createTrickAutoCompleteNode, TrickAutoCompleteNode } from "../nodes/TrickAutoCompleteNode";

type CommandPayload = string;
export const INSERT_TRICK_AUTOCOMPLETE_COMMAND: LexicalCommand<CommandPayload> =
  createCommand('INSERT_TRICK_AUTOCOMPLETE_COMMAND');

export default function TrickAutoCompletePlugin(props: {tricks: string[]}) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const removeListener = editor.registerCommand(
      INSERT_TRICK_AUTOCOMPLETE_COMMAND, 
      (payload: CommandPayload) => {
        editor.update(() => {
          $insertNodes([$createTrickAutoCompleteNode(props.tricks)]);
        });

        return true;
      }, 
      COMMAND_PRIORITY_EDITOR);
    
    return () => {
      removeListener();
    };
  }, [editor, props.tricks]);

  return null;
}