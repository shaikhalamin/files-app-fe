"use client";

import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useSearchParams } from "next/navigation";
import BaseContainer from "../common/container/BaseContainer";
import FilePublicPreviewComponent from "../storage-file/FilePublicPreview";

const FilePreview = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  return (
    <BaseContainer>
      <Row className="py-2">
        <Col md={12}>
          <FilePublicPreviewComponent token={token as string} />
        </Col>
      </Row>
    </BaseContainer>
  );
};

export default FilePreview;
