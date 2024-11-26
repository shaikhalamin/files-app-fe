import React, { useState } from "react";
import { Row, Col, Card, Badge, Stack, Button, Form } from "react-bootstrap";
import Link from "next/link";
import { UserFile } from "@/app/types/user/user-files";
import FileComponent from "../storage-file/FileComponent";
import {
  generateShareableLink,
  uploadFile,
} from "@/app/api/services/storage-files";
import SubmitButton from "../common/form/SubmitButton";
import { BsClipboard2 } from "react-icons/bs";

type SingleFileType = {
  userFile: UserFile;
};

const SingleFileItem: React.FC<SingleFileType> = ({ userFile }) => {
  const [fileShareableLink, setFileShareableLink] = useState("");
  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileShareableLink(event.target.value);
  };

  const [copyLinkText, setCopyLinkText] = useState("Copy");

  const handleCopyClick = async () => {
    if (!fileShareableLink) {
      alert("Please generate link first !");
      return;
    }
    await navigator.clipboard.writeText(fileShareableLink);
    setCopyLinkText("Copied!");
    setTimeout(() => {
      setCopyLinkText("Copy Link");
    }, 1500);
  };

  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setSubmitLoading(true);
      setFileShareableLink("Generating....");
      const { data } = await generateShareableLink(userFile.file_name);

      setFileShareableLink(data?.data);
      setSubmitLoading(false);
    } catch (error) {
      setFileShareableLink("");
      setSubmitLoading(false);
      console.error("File upload error", error);
    }
  };

  return (
    <Row className="py-1 px-1 mt-3">
      <Col md="5" className="mt-1 mb-1">
        <Card className="rounded-0">
          <Card.Body className="position-relative py-0 px-0">
            {/*eslint-disable-next-line @next/next/no-img-element*/}
            <FileComponent userFile={userFile} />
          </Card.Body>
        </Card>
      </Col>
      <Col md="7" className="border-bottom">
        <Card className="border-0">
          <Row className="py-2 px-1">
            <Col className="mt-2 mb-3">
              <div className="mt-2 mb-1 text-color-a3a fw-bold">
                <Row>
                  <Col
                    lg="12"
                    md="12"
                    sm="12"
                    xs="12"
                    className="text-start ft-20"
                  >
                    <h6>{userFile.file_name}</h6>
                  </Col>
                </Row>
                <Row>
                  <Col
                    lg="12"
                    md="12"
                    sm="12"
                    xs="12"
                    className="text-start ft-20"
                  >
                    <Stack direction="horizontal" gap={2}>
                      {userFile.tags.map((tag) => (
                        <>
                          <Badge pill bg="secondary">
                            {tag.tag_name}
                          </Badge>
                        </>
                      ))}
                    </Stack>
                  </Col>
                </Row>

                <Row className="py-2">
                  <Col
                    lg="12"
                    md="12"
                    sm="12"
                    xs="12"
                    className="text-start ft-20"
                  >
                    <p>Views: {userFile.totalViews}</p>
                  </Col>
                </Row>

                <Row className="py-1">
                  <Col lg="6" md="6" sm="6" xs="6" className="text-start ft-20">
                    <Button
                      href={`/preview?fileName=${userFile.file_name}`}
                      variant="primary"
                    >
                      View file
                    </Button>
                  </Col>
                </Row>

                <Form onSubmit={handleSubmit}>
                  <Row className="py-2">
                    <Col md="7" sm="7" xs="7" className="ft-20">
                      <Form.Group className="mb-3">
                        <Form.Control
                          type="text"
                          value={fileShareableLink}
                          onChange={handleFieldChange}
                          placeholder="Generate File shareable link"
                        />
                      </Form.Group>
                    </Col>

                    <Col md="2" sm="2" xs="2" className="">
                      <p onClick={() => handleCopyClick()}>
                        <BsClipboard2 size={30} />
                      </p>
                      <p>{copyLinkText}</p>
                    </Col>

                    <Col md="3" sm="3" xs="3" className=" ft-20">
                      <SubmitButton
                        title="Generate Link"
                        isLoading={submitLoading}
                        loadingTitle=""
                        buttonCls="w-100 signup-btn"
                        variant="primary"
                        isDisabled={submitLoading}
                      />
                    </Col>
                  </Row>
                </Form>
              </div>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default SingleFileItem;
