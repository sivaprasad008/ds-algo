import React, { useRef, useState, useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js`;

// const pdfFilePath = '/huffmanSlides.pdf'; // Correct path

const Presentation = (props) => {
  const {pdfFilePath} = props
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isFullScreenMode, setFullScreenMode] = useState(false);
  const viewerRef = useRef(null);

  // Handle page load success
  const onLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  // Handle fullscreen mode
  const handleFullscreen = () => {
    const viewerElement = viewerRef.current;

    if (!isFullScreenMode) {
      if (viewerElement.requestFullscreen) {
        viewerElement.requestFullscreen();
      } else if (viewerElement.webkitRequestFullscreen) { // Safari
        viewerElement.webkitRequestFullscreen();
      } else if (viewerElement.msRequestFullscreen) { // IE11
        viewerElement.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) { // Safari
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { // IE11
        document.msExitFullscreen();
      }
    }
  };

  // Handle key down events
  const handleKeyDown = (event) => {
    if (event.ctrlKey && (event.key === '`' || event.key === '~')) {
      handleFullscreen();
    } else if (event.key === 'ArrowRight') {
      setPageNumber(prevPage => Math.min(prevPage + 1, numPages));
    } else if (event.key === 'ArrowLeft') {
      setPageNumber(prevPage => Math.max(prevPage - 1, 1));
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [numPages]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
        setFullScreenMode(true);
        document.body.classList.add('fullscreen-mode');
      } else {
        setFullScreenMode(false);
        document.body.classList.remove('fullscreen-mode');
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div
      ref={viewerRef}
      style={{
        height: '54vh',
        width: '54vw',
        overflow: 'hidden',
        backgroundColor: 'black', // Set background color to black
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // marginLeft:"-1rem"
      }}
    >
      <Document
        file={pdfFilePath}
        onLoadSuccess={onLoadSuccess}
        options={{ workerSrc: pdfjs.GlobalWorkerOptions.workerSrc }}
      >
        <Page
          pageNumber={pageNumber}
          scale={isFullScreenMode ? 2.5 : 1.5} 
          renderTextLayer={false} 
        />
      </Document>
    </div>
  );
};

export default Presentation;
