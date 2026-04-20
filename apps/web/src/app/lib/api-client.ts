async function refreshSession() {

  const refreshToken = Cookies.get('refreshToken')

  if (!refreshToken) return null



  try {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {

      method: 'POST',

      headers: { 'Content-Type': 'application/json' },

      body: JSON.stringify({ token: refreshToken }),

    })



    const data = await res.json()



    if (res.ok) {

      Cookies.set('accessToken', data.accessToken, { expires: 1/96, secure: true, sameSite: 'strict' })

      Cookies.set('refreshToken', data.refreshToken, { expires: 7, secure: true, sameSite: 'strict' })



      if (typeof window !== 'undefined') {

        window.location.reload()

      }



      return data.accessToken

    } else {

      throw new Error('Refresh token expired')

    }

  } catch (e) {

    Cookies.remove('accessToken')

    Cookies.remove('refreshToken')

    localStorage.removeItem('user')



    if (typeof window !== 'undefined') {

      window.location.href = '/auth/login'

    }

  }

  return null

}