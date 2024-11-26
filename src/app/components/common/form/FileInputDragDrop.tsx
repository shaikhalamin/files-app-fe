import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Card, Form, Col, Row } from "react-bootstrap";
import { uploadFile } from "@/app/api/services/storage-files";
import SubmitButton from "./SubmitButton";

type FilesProps = {
  handleRefetch: () => void;
};

const FileUploadWithFields: React.FC<FilesProps> = ({ handleRefetch }) => {
  const [file, setFile] = useState<File | null>(null);
  const [tagField, setTagField] = useState("");
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  const onDrop = (acceptedFiles: File[]) => {
    console.log("acceptedFiles", acceptedFiles);

    if (!acceptedFiles.length) {
      alert("Please select file");
      return;
    }
    setFile(acceptedFiles[0]);
  };

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagField(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!file) {
      alert("Invalid file type. Please select a image or video file !");
      return;
    }

    try {
      setSubmitLoading(true);
      const formData = new FormData();

      // Append the file as 'fileName' in the formData
      formData.append("fileName", file);

      // Append tags field
      formData.append("tags", tagField);

      // Call the API
      const { data } = await uploadFile(formData);
      handleRefetch();
      setSubmitLoading(false);
      console.log("File uploaded successfully", data?.data);
    } catch (error) {
      setSubmitLoading(false);
      console.error("File upload error", error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/gif": [".gif"],
      "image/webp": [".webp"],
      "video/mp4": [".mp4"],
      "video/webm": [".webm"],
      "video/avi": [".avi"],
    },
    maxFiles: 1,
    multiple: false,
  });

  return (
    <Row className="justify-content-center mt-5">
      <Col md={12}>
        <Card className="p-4 shadow-sm border rounded">
          <Card.Body>
            <div
              {...getRootProps()}
              className="dropzone text-center p-5 border-dashed border-3 mb-4 rounded"
            >
              <input {...getInputProps()} />
              <p className="mb-0 text-muted">
                Drag & Drop an image or video file here, or click to select a
                file
              </p>
            </div>

            {file && (
              <div className="text-center mb-3">
                <p>
                  <strong>Selected file:</strong> {file.name}
                </p>
              </div>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>File Tags</Form.Label>
                <Form.Control
                  type="text"
                  value={tagField}
                  onChange={handleFieldChange}
                  placeholder="Enter comma separated file tags like bird,nature etc"
                  required
                />
              </Form.Group>

              <Row className="py-3">
                <Col md={{ span: 6, offset: 3 }}>
                  <SubmitButton
                    title="Upload"
                    isLoading={submitLoading}
                    loadingTitle=""
                    buttonCls="w-100 mt-3 signup-btn"
                    variant="primary"
                    isDisabled={submitLoading}
                  />
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default FileUploadWithFields;
