import React, {useState} from 'react';
import './App.css';
import FileViewer from 'react-file-viewer';
import {FilePreviewerThumbnail} from 'react-file-previewer';

function App() {
  const [activeDoc, setActiveDoc] = useState(null);
  const docList = [
    {
      name: '1',
      type: 'pdf',
      url: './documents/1.pdf'
    },
    {
      name: '2',
      type: 'jpg',
      url: './documents/2.jpg'
    },
    {
      name: '3',
      type: 'png',
      url: './documents/3.png'
    },
    {
      name: '4',
      type: 'jpg',
      url: './documents/4.jpg'
    },
    {
      name: '5',
      type: 'bmp',
      url: './documents/5.bmp'
    },
    {
      name: '6',
      type: 'docx',
      url: './documents/6.docx'
    }
  ];

  const changeActiveDoc = (id) => {
    let selectedDoc = docList.find(item => item.name === id);
    console.log('selectedDoc:', selectedDoc);
    setActiveDoc({...selectedDoc});
  }

  let sideBarContent = docList.map(item => (
    <li 
      key={item.name}
      onClick={(id) => changeActiveDoc(item.name)}
      id={item.name}
    >
      <FilePreviewerThumbnail 
        file={{
          url: item.url,
          mimeType: item.type,
          name: item.name
        }}
      />
    </li>
  ))

  let url = activeDoc ? activeDoc.url : ''

  return (
    <div className="App">
      <main>
        <aside>
          <ul>
            {sideBarContent}
          </ul>
        </aside>
        <section>
          <iframe 
            src={activeDoc ? activeDoc.url : ''} title={activeDoc ? activeDoc.name : 'empty'}
            allow="fullscreen"
          >
          Presss me: <a href="https://www.google.com">Download PDF</a>
          </iframe>
        </section>
      </main>
    </div>
  );
}

export default App;
