import React, {useState, useEffect} from 'react';
import './App.css';
import {FilePreviewerThumbnail} from 'react-file-previewer';
import _ from 'lodash';

// let cssLink = document.createElement("link");
// cssLink.href = './iframe-styles.css'; 
// cssLink.rel = "stylesheet"; 
// cssLink.type = "text/css"; 
// frames['iframe-container'].document.head.appe ndChild(cssLink);

function App() {
  const [activeDoc, setActiveDoc] = useState(null);
  const docList = [
    {
      name: 'ft-lauderdale-info',
      type: 'pdf',
      url: './documents/ft-lauderdale-info.pdf'
    },
    {
      name: 'me',
      type: 'jpg',
      url: './documents/me.jpg'
    },
    {
      name: 'code-1',
      type: 'png',
      url: './documents/code-1.png'
    },
    {
      name: 'code-2',
      type: 'jpg',
      url: './documents/code-2.jpg'
    },
    {
      name: 'bitmap-graphic',
      type: 'bmp',
      url: './documents/bitmap-graphic.bmp'
    },
    {
      name: 'word-document',
      type: 'docx',
      url: './documents/word-document.docx'
    }
  ];
  
  
  useEffect(() => {
    applyIframeStylesheet();
  }, []);
  
  const applyIframeStylesheet = () => {
    let iframeElement = document.getElementById('iframe-container');
    let doc = iframeElement.contentDocument;
    if (doc && doc.body) { 
      doc.body.innerHTML = doc.body.innerHTML+ `<style>body {height:100%;display:flex;justify-content:center;align-items:center;}</style>`;
    }
  }

  const changeActiveDoc = (id) => {
    let iframeElement = document.getElementById('iframe-container');
    let doc = iframeElement.contentDocument;
    let selectedDoc = _.find(docList, (item) => item.name === id);
    setActiveDoc({...selectedDoc});
    setTimeout(() => {
      applyIframeStylesheet();
    }, 50)
  }

  let sideBarContent = docList.map(item => (
    <li 
      key={item.name}
      onClick={(id) => changeActiveDoc(item.name)}
      id={item.name}
      className={`thumbnail-item ${activeDoc && item.name === activeDoc.name ? 'active' : ''}`}
    >
      <img 
        src={`./icons/${item.type}-icon.png`}
        alt="File type preview"
      />
      <p>{item.name}</p>
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
            name="iframe-container"
            id="iframe-container"
            scrolling="no"
          >
          </iframe>
        </section>
      </main>
    </div>
  );
}

export default App;
