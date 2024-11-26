import FilePreview from "@/app/components/shareable-link/FilePreview";
import React from "react";
import { Suspense } from "react";

const File = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <FilePreview />
      </Suspense>
    </>
  );
};

export default File;
