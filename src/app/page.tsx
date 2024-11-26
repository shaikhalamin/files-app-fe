import { Col, Container, Row } from "react-bootstrap";
import PrivateLayout from "./components/layouts/PrivateLayout";
import HomeComponent from "./components/home/HomeComponent";

export default function Home() {
  return (
    <PrivateLayout>
      <Container>
        <Row>
          <Col>
            <HomeComponent />
          </Col>
        </Row>
      </Container>
    </PrivateLayout>
  );
}
