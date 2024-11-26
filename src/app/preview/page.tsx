import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import PrivateLayout from "../components/layouts/PrivateLayout";
import PrivatePreviewComponent from "../components/preview/PrivatePreviewComponent";
import { Suspense } from "react";

const PrivatePreviewPage = () => {
  return (
    <PrivateLayout>
      <Container>
        <Row>
          <Col>
            <Suspense fallback={<div>Loading...</div>}>
              <PrivatePreviewComponent />
            </Suspense>
          </Col>
        </Row>
      </Container>
    </PrivateLayout>
  );
};

export default PrivatePreviewPage;
