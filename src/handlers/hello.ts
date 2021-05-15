
export const handle = async (event) => {
  console.log(event);

  return {
    statusCode: 200,
    body: 'Hello',
  }
}