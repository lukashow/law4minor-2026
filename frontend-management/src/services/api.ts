const API_BASE_URL = 'http://localhost:3001/api';

// Get user ID from localStorage for authentication
function getUserId(): string | null {
  try {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user).id;
    }
  } catch {}
  return null;
}

function getAuthHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  const userId = getUserId();
  if (userId) {
    headers['X-User-Id'] = userId;
  }
  
  const token = localStorage.getItem('auth_token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
}

async function handleResponse(response: Response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(error.message || error.error || `API Error: ${response.statusText}`);
  }
  
  // Handle 204 No Content
  if (response.status === 204) {
    return null;
  }
  
  return response.json();
}

export const api = {
  get: async (endpoint: string, params?: Record<string, string>) => {
    const url = new URL(endpoint.startsWith('/') ? endpoint.slice(1) : endpoint, API_BASE_URL + '/');
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value) url.searchParams.append(key, value);
      });
    }
    
    const response = await fetch(url.toString(), {
      headers: getAuthHeaders(),
    });

    return handleResponse(response);
  },

  post: async (endpoint: string, data: any) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });

    return handleResponse(response);
  },

  put: async (endpoint: string, data: any) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });

    return handleResponse(response);
  },

  delete: async (endpoint: string) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    return handleResponse(response);
  },
};

export default api;
