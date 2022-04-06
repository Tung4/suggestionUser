import React, {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { EditorState } from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import createMentionPlugin, {
  defaultSuggestionsFilter, MentionData,
} from '@draft-js-plugins/mention';
import './editor.scss';
import '@draft-js-plugins/mention/lib/plugin.css';
import { useGetUsersQuery } from '../services/counterAPI';

function TextEditor(): ReactElement {
  const [open, setOpen] = useState(true);
  const [suggestions, setSuggestions] = useState<MentionData[] | undefined>([]);
  const ref = useRef<Editor>(null);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
 
  const responseFromQuery = useGetUsersQuery('user');
  const { data, isLoading, error } = responseFromQuery;
  const dataUser: MentionData[] = useMemo(() => data ? data?.Item : [], [data]);

  useEffect(() => {
      setSuggestions(dataUser)
  }, [dataUser])

  const { MentionSuggestions, plugins } = useMemo(() => {
    const mentionPlugin = createMentionPlugin();
    const { MentionSuggestions } = mentionPlugin;
    const plugins = [mentionPlugin];
    return { plugins, MentionSuggestions };
  }, []);

  const onOpenChange = useCallback((_open: boolean) => {
    setOpen(_open);
  }, []);
  const onSearchChange = useCallback(({ value }: { value: string }) => {
    setSuggestions(defaultSuggestionsFilter(value, dataUser));
  }, [dataUser]);

  return (
    <div
      className={'editor'}
      onClick={() => {
        ref.current?.focus();
      }}
    >
      <Editor
        editorKey={'editor'}
        editorState={editorState}
        onChange={setEditorState}
        plugins={plugins}
        ref={ref}
      />
      <MentionSuggestions
        open={open}
        onOpenChange={onOpenChange}
        suggestions={suggestions}
        onSearchChange={onSearchChange}
        onAddMention={() => {
          // get the mention object selected
        }}
      />
    </div>
  );
}

export default TextEditor;