import Cookies from 'js-cookie';
import {
  WorkOrder,
  CreateWorkOrderInput,
  UpdateWorkOrderInput,
  WorkOrderMessage,
  WorkOrderPart,
  WorkOrderStatus,
  Machine,
  User,
} from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

async function refreshSession() {
  const refreshToken = Cookies.get('refreshToken');

  if (!refreshToken) return null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: refreshToken }),
    });

    const data = await res.json();

    if (res.ok) {
      Cookies.set('accessToken', data.accessToken, {
        expires: 1 / 96,
        secure: true,
        sameSite: 'strict',
      });

      Cookies.set('refreshToken', data.refreshToken, {
        expires: 7,
        secure: true,
        sameSite: 'strict',
      });

      if (typeof window !== 'undefined') {
        window.location.reload();
      }

      return data.accessToken;
    } else {
      throw new Error('Refresh token expired');
    }
  } catch (e) {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    localStorage.removeItem('user');

    if (typeof window !== 'undefined') {
      window.location.href = '/auth/login';
    }
  }

  return null;
}

async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  let token = Cookies.get('accessToken');

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  let response = await fetch(`${API_URL}${endpoint}`, { ...options, headers });

  if (response.status === 401) {
    console.warn('Token wygasł, próbuję odświeżyć sesję...');
    const newToken = await refreshSession();

    if (newToken) {
      headers['Authorization'] = `Bearer ${newToken}`;
      response = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
    }
  }

  if (!response.ok) {
    let errorMsg = 'Wystąpił błąd.';
    try {
      const errData = await response.json();
      errorMsg = errData.message || errorMsg;
    } catch (e) {}
    throw new Error(errorMsg);
  }

  return response;
}

// === Endpoints ===

export async function fetchWorkOrders(): Promise<WorkOrder[]> {
  const res = await fetchWithAuth('/work-orders');
  return res.json();
}

export async function fetchWorkOrderById(id: string): Promise<WorkOrder> {
  const res = await fetchWithAuth(`/work-orders/${id}`);
  return res.json();
}

export async function createWorkOrder(data: CreateWorkOrderInput): Promise<WorkOrder> {
  const res = await fetchWithAuth('/work-orders', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateWorkOrder(id: string, data: UpdateWorkOrderInput): Promise<WorkOrder> {
  const res = await fetchWithAuth(`/work-orders/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateWorkOrderStatus(id: string, status: WorkOrderStatus): Promise<WorkOrder> {
  const res = await fetchWithAuth(`/work-orders/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
  return res.json();
}

export async function assignTechnician(id: string, technicianId: string): Promise<WorkOrder> {
  const res = await fetchWithAuth(`/work-orders/${id}/assign`, {
    method: 'PATCH',
    body: JSON.stringify({ technicianId }),
  });
  return res.json();
}

export async function confirmBhp(id: string): Promise<WorkOrder> {
  const res = await fetchWithAuth(`/work-orders/${id}/bhp-confirm`, {
    method: 'POST',
  });
  return res.json();
}

// Messages
export async function fetchMessages(id: string): Promise<WorkOrderMessage[]> {
  const res = await fetchWithAuth(`/work-orders/${id}/messages`);
  return res.json();
}

export async function addMessage(id: string, content: string): Promise<WorkOrderMessage> {
  const res = await fetchWithAuth(`/work-orders/${id}/messages`, {
    method: 'POST',
    body: JSON.stringify({ content }),
  });
  return res.json();
}

// Parts
export async function fetchWorkOrderParts(id: string): Promise<WorkOrderPart[]> {
  const res = await fetchWithAuth(`/work-orders/${id}/parts`);
  return res.json();
}

export async function addPartToWorkOrder(id: string, partId: string, quantity: number): Promise<WorkOrderPart> {
  const res = await fetchWithAuth(`/work-orders/${id}/parts`, {
    method: 'POST',
    body: JSON.stringify({ partId, quantity }),
  });
  return res.json();
}

// Helpers
export async function fetchAllMachines(): Promise<Machine[]> {
  const res = await fetchWithAuth('/machines');
  return res.json();
}

export async function fetchTechnicians(): Promise<User[]> {
  const res = await fetchWithAuth('/users?role=TECHNICIAN');
  const response = await res.json();

  return Array.isArray(response) ? response : response.data || [];
}

export async function fetchAllParts(): Promise<any[]> {
  const res = await fetchWithAuth('/inventory/parts');
  const response = await res.json();

  return Array.isArray(response) ? response : (response.data || response.parts || []);
}
