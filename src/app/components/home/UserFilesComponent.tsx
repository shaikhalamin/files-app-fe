"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Row, Col, Spinner } from "react-bootstrap";

import CustomPagination from "../common/pagination/CustomPagination";
import { UserFile, UserFileList } from "@/app/types/user/user-files";
import { FilterType, FilterTypeInitialVal } from "@/app/types/files/filestypes";
import { prepareFileResponse } from "./homeHelpers";
import {
  getUserFiles,
  getUserFilesByFilter,
} from "@/app/api/services/storage-files";
import SingleFileItem from "./SingleFileItem";
import { createFilterUrl } from "@/app/utils/api";

export type BasicType = {
  page: number;
  perPage: number;
};

type UserFilesProps = {
  shouldRefetch: boolean;
  resetRefetch: () => void; // Add resetRefetch
};

const UserFilesComponent: React.FC<UserFilesProps> = ({
  shouldRefetch,
  resetRefetch,
}) => {
  const [fileList, setFileList] = useState<UserFileList>({
    results: [] as UserFile[],
    meta: {
      allTotal: 0,
      total: 0,
      perPage: 0,
      currentPage: 0,
    },
  } as UserFileList);
  const [filterClient, setFilterClient] = useState(false);
  const [active, setActive] = useState(1);
  const [loading, setLoading] = useState(false);
  const [customFilter, setCustomFilter] =
    useState<FilterType>(FilterTypeInitialVal);

  const fetchFiles = () => {
    setLoading(true);
    getUserFiles()
      .then((res) => {
        setLoading(false);
        const userFileList = prepareFileResponse(res);
        setFileList(userFileList);
        resetRefetch(); // Reset refetch state after data is fetched
      })
      .catch((err) => {
        setLoading(false);
        console.error("data fetch error", err);
        resetRefetch(); // Ensure reset is called even if fetch fails
      });
  };

  useEffect(() => {
    fetchFiles();
  }, []); // Initial load

  useEffect(() => {
    if (shouldRefetch) {
      fetchFiles(); // Trigger refetch
    }
  }, [shouldRefetch]);

  useEffect(() => {
    if (filterClient) {
      setLoading(true);
      const queryUrl = createFilterUrl(customFilter);
      console.log("queryUrl", queryUrl);

      getUserFilesByFilter(queryUrl)
        .then((res) => {
          setLoading(false);
          const userFileList = prepareFileResponse(res);
          setFileList(userFileList);
        })
        .catch((err) => {
          setLoading(false);
          console.error("data fetch error", err);
        });
    }
  }, [filterClient, customFilter, customFilter.basic]);

  const handlePagination = useCallback(
    (page: number) => {
      filterClient === false && setFilterClient(true);
      page && setActive(page);
      setCustomFilter((prevState) => ({
        ...prevState,
        basic: {
          ...prevState.basic,
          page,
        },
      }));
    },
    [filterClient]
  );

  return (
    <>
      <Row className="py-5 px-5 mt-3">
        <Col md={12} className="mt-1 mb-1 text-center">
          {loading && (
            <Row className="py-1 px-1 mt-3">
              <Col
                md={{ span: 4, offset: 4 }}
                className="mt-1 mb-1 text-center"
              >
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />{" "}
                Fetching....
              </Col>
            </Row>
          )}

          {!loading && fileList.results.length > 0 && (
            <div
              style={{
                minHeight: "400px",
                position: "relative",
              }}
            >
              {fileList.results.map((userFile, index) => (
                <SingleFileItem userFile={userFile} key={index} />
              ))}
            </div>
          )}

          {!loading && fileList.results.length > 0 && (
            <>
              <hr className="mt-3" />
              <CustomPagination
                currentPage={active}
                totalPages={Math.floor(
                  fileList.meta.allTotal / fileList.meta.perPage
                )}
                onPageChange={handlePagination}
              />
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default UserFilesComponent;
