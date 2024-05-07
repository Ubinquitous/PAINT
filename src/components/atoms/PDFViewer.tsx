import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

type PDFViewerProps = {
  path: string;
  scale: number;
};

type PDFProxyType = any; // PDFProxyType

const PDFViewer = ({ path }: PDFViewerProps) => {
  const [pages, setPages] = useState(0);
  const onDocumentError = (error: Error) => {
    console.log("pdf viewer error", error);
  };

  const onDocumentLocked = () => {
    console.log("pdf locked");
  };

  const onDocumentLoadSuccess = (props: PDFProxyType) => {
    setPages(props._pdfInfo.numPages);
  };

  return (
    <Document
      file={path}
      onLoadSuccess={onDocumentLoadSuccess}
      onLoadError={onDocumentError}
      onPassword={onDocumentLocked}
    >
      {Array.from({ length: pages }).map((_, i) => (
        <Page
          key={`page_${i + 1}`}
          pageNumber={i + 1}
          width={360}
          renderAnnotationLayer={false}
        />
      ))}
    </Document>
  );
};

export default PDFViewer;
