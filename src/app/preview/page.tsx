import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import PrivateLayout from "../components/layouts/PrivateLayout";
import PrivatePreviewComponent from "../components/preview/PrivatePreviewComponent";

const PrivatePreviewPage = () => {
  return (
    <PrivateLayout>
      <Container>
        <Row>
          <Col>
            <PrivatePreviewComponent />
          </Col>
        </Row>
      </Container>
    </PrivateLayout>
  );
};

export default PrivatePreviewPage;
