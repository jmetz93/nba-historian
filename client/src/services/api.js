import 'whatwg-fetch'

class ApiError extends Error {
  constructor(message, status) {
    super(message)
    
    this.status = status;
    
    Error.captureStackTrace(this, ApiError);
  }
};

export const apiUrl = 'http://localhost:5000';
export const GET = 'GET';
export const POST = 'POST';
export const PUT = 'PUT';
export const DELETE = 'DELETE';

const api = async (options) => {
  const { path, method, headers, body } = options
  let json;
  try {
    const res = await fetch(`${apiUrl}/${path}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...headers
      },
      method,
      ...(method !== GET  && method !== DELETE && { body: JSON.stringify(body) }), // cant have body prop in get or delete request
    });

    json = await res.json();

    if (!res.ok) {
      
      console.warn(`Error in api call to => ${path}`, json.message, res);
  
      throw new ApiError(json.message, res.status);
    }
  } catch (error) {
    throw new ApiError(error.message, error.status);
  }
  return json;
}

export default api;