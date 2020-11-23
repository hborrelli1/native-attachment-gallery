import React, {useState, useEffect} from 'react';
import './App.css';
import {FilePreviewerThumbnail} from 'react-file-previewer';
import _ from 'lodash';
import Iframe from 'react-iframe'

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
      url: 'https://st1-userdata.gridics.com/fl/s3fs-public/tiles/projects/City%20of%20Fort%20Lauderdale%20FL%20Zoning%20Check%20_%20CodeHUB%20by%20Gridics.pdf'
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
  
  const applyIframeStylesheet = async () => {
    if (activeDoc) {
      let iframeElement = await document.getElementById('iframe-container');
      let doc = iframeElement.contentDocument;
      if (doc && doc.body) { 
        doc.body.innerHTML = doc.body.innerHTML+ `<style>body {height:100%;display:flex;justify-content:center;align-items:center;}</style>`;
      }
    }
  }

  const changeActiveDoc = (id) => {
    // let iframeElement = document.getElementById('iframe-container');
    // let doc = iframeElement.contentDocument;
    let selectedDoc = _.find(docList, (item) => item.name === id);
    console.log('selectedDoc', selectedDoc);
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

  // const iFrameEl = (
  //   <iframe 
  //     src={activeDoc ? activeDoc.url : ''} 
  //     title={activeDoc ? activeDoc.name : 'empty'}
  //     allow="fullscreen"
  //     name="iframe-container"
  //     id="iframe-container"
  //     scrolling="no"
  //   ></iframe>
  // )

  // const iFrameEl = (<Iframe url={activeDoc ? activeDoc.url : 'https://www.google.com'}
  //       width="450px"
  //       height="450px"
  //       id="myId"
  //       className="myClassname"
  //       display="initial"
  //       position="relative"/>)

  console.log('rendering')

  return (
    <div className="App">
      <main>
        <aside>
          <ul>
            {sideBarContent}
          </ul>
        </aside>
        <section>
          {activeDoc && (
            <Iframe 
              url={activeDoc.url}
              width="`100%`"
              height="100%"
              id="iframe-container"
              className="myClassname"
              display="initial"
              position="relative"
            />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
