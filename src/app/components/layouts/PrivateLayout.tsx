"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { getLocalSession } from "@/app/api/local-storage";

type PrivateRoute = {
  children: React.ReactNode;
};

const PrivateLayout: React.FC<PrivateRoute> = ({ children }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const session = getLocalSession();
    if (session) {
      setIsAuthenticated(true);
    } else {
      router.push("/auth/signin");
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="py-5">
        <Container
          fluid
          className="py-5 d-flex align-items-center justify-content-center"
        >
          <Row>
            <Col className="py-5 text-center">
            <Spinner animation="border" role="status" size="sm" /> Loading ... 
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
};

export default PrivateLayout;
