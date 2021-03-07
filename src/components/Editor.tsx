import React from 'react';
import EditorJs from 'react-editor-js';
import { EditorJsProps } from 'react-editor-js/dist/EditorJs';
import { OutputData } from '@editorjs/editorjs';
import editorTools from 'constants/editor-tools';

interface EditorProps {
  data?: OutputData | null;
}

const Editor: React.FC<EditorProps & EditorJsProps> = ({ data, ...props }) => (
  <EditorJs data={data !== null ? data : undefined} tools={editorTools} {...props} />
);

export default Editor;
