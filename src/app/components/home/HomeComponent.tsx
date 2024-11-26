"use client";

import React, { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import FileUploadWithFields from "../common/form/FileInputDragDrop";
import UserFilesComponent from "./UserFilesComponent";

const HomeComponent = () => {
  const [refetch, setRefetch] = useState<boolean>(false);

  const handleRefetch = () => {
    setRefetch(true);
    console.log("calling handle refetch");
  };

  const resetRefetch = () => {
    setRefetch(false);
  };

  return (
    <div>
      <Container>
        <Row className="py-2">
          <Col>
            <Card className="border border-0">
              <Card.Body>
                <h3 className="text-center">File sharing app</h3>
                <FileUploadWithFields handleRefetch={handleRefetch} />
                <UserFilesComponent
                  shouldRefetch={refetch}
                  resetRefetch={resetRefetch}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomeComponent;
