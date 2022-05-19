const returnResponseOfDataAccessorResponse = async (
  dataAccessorResponse,
  res
) => {
  try {
    let response = await dataAccessorResponse;

    // if (response.data.length > 0) {
    //   res.status(response.status);
    //   return res.send(response.data);
    // }
    // else {
    //   res.status(404);
    //   return res.end();

    // }
    res.status(response.status);
    return res.send(response.data);


  } catch (error) {
    throw error;
  }
};
module.exports = {
  returnResponseOfDataAccessorResponse
};
