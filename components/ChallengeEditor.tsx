import React, {useEffect, useState} from 'react';
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {PlainTextPlugin} from '@lexical/react/LexicalPlainTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import CustomAutoFocusPlugin from '../lexical/plugins/CustomAutoFocusPlugin';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import TreeViewPlugin from '../lexical/plugins/TreeViewPlugin';
import onChange from '../lexical/OnChange';
import EmoticonPlugin from '../lexical/plugins/EmoticonPlugin';
import { EmoticonNode } from '../lexical/nodes/EmoticonNode';
import ChallengeCreatorPlugin from '../lexical/plugins/ChallengeCreatorPlugin';
import { TricksClient } from '@trickingapi/tricking-ts';
import TrickPlugin from '../lexical/plugins/TrickPlugin';
import { TrickNode } from '../lexical/nodes/TrickNode';

const theme = {
  // Theme styling goes here
  ltr: 'ltr',
  rtl: 'rtl',
  placeholder: 'editor-placeholder',
  paragraph: 'editor-paragraph',
}

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error) {
  console.error(error);
}

export default function ChallengeEditor() {
  const initialConfig = {
    namespace: 'MyEditor', 
    theme,
    onError,
    nodes: [EmoticonNode, TrickNode]
  };

  useEffect(() => {
    const tricksClient = new TricksClient();
    tricksClient.getAllTrickNames().then((trickNames: string[]) => {
      const trickSet = new Set<string>(trickNames);
      TrickNode.setTricks(trickSet);
    });
  }, []);

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className='editor-container'>
        <PlainTextPlugin
          contentEditable={<ContentEditable className="editor-input"/>}
          placeholder={<Placeholder />}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <OnChangePlugin onChange={onChange} />
        <HistoryPlugin />
        <TreeViewPlugin />
        <EmoticonPlugin />
        <TrickPlugin />
        <ChallengeCreatorPlugin />
        <CustomAutoFocusPlugin />
      </div>
    </LexicalComposer>
  );
}

function Placeholder() {
  return (
    <div className="editor-placeholder">
      Enter some text...
    </div>
  );
}