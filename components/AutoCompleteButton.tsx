import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FunctionComponent } from "react";
import { INSERT_TRICK_AUTOCOMPLETE_COMMAND } from "../lexical/plugins/TrickAutoCompletePlugin";

const AutoCompleteButton: FunctionComponent = () => {
  const [editor] = useLexicalComposerContext();
  
  const insertAutoComplete = () => {
    editor.dispatchCommand(INSERT_TRICK_AUTOCOMPLETE_COMMAND, 'test');
  }
  return <button onClick={insertAutoComplete}>Insert AutoComplete</button>;
}

export default AutoCompleteButton;