"use client";

import React from "react";

import { useSearchParams } from "next/navigation";

import FilePrivatePreviewComponent from "../storage-file/FilePrivatePreviewComponent";
import { Row, Col } from "react-bootstrap";

const PrivatePreviewComponent = () => {
  const searchParams = useSearchParams();
  const fileName = searchParams.get("fileName");

  return (
    <Row className="py-5">
      <Col>
        <FilePrivatePreviewComponent fileName={fileName as string} />;
      </Col>
    </Row>
  );
};

export default PrivatePreviewComponent;
