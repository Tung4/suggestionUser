import React from 'react';
import TextEditor from './text-editor/TextEditor';
import './styles.scss';

const App: React.FC = () => (
    <div className="wrapper">
      <h1>Comment:</h1>
        <TextEditor />
    </div>
);

export default App;
