export const prepareFileResponse = (response: any) => {
  const responseList = response?.data?.data;
  return responseList;
};
