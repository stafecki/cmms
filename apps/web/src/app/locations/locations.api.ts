import Cookies from 'js-cookie'

const API_URL = 'http://localhost:3000/locations'

// Pomocnicza funkcja do nagłówków
const getHeaders = () => {
  const token = Cookies.get('accessToken')
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
}

export const locationsApi = {
  // GET
  getAll: async () => {
    const response = await fetch(API_URL, {
      headers: getHeaders()
    })
    if (!response.ok) throw new Error('Błąd pobierania lokalizacji')
    return response.json()
  },

  // GET
  getById: async (id: string) => {
    const response = await fetch(`${API_URL}/${id}`, {
      headers: getHeaders()
    })
    if (!response.ok) throw new Error('Nie znaleziono lokalizacji')
    return response.json()
  },

  // POST
  create: async (data: { name: string; type: string; parentId?: string | null }) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('Odrzucenie z serwera (szczegóły):', errorData)

      // Sprawdzamy, czy to błąd walidacji Zod od Hono
      if (errorData.error && Array.isArray(errorData.error.issues)) {
        const zodErrors = errorData.error.issues
          .map((i: any) => `Pole "${i.path.join('.')}": ${i.message}`)
          .join('\n')
        throw new Error(`Błąd walidacji danych:\n${zodErrors}`)
      }

      throw new Error(errorData.message || 'Wystąpił nieznany błąd serwera (400)')
    }

    return response.json()
  },

  // PATCH
  update: async (id: string, data: { name?: string; type?: string; parentId?: string | null }) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify(data)
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Błąd podczas aktualizacji lokalizacji')
    }
    return response.json()
  },

  // DELETE
  delete: async (id: string) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Nie udało się usunąć lokalizacji')
    }
    return response.json()
  }
}