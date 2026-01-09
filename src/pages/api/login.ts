import type { APIRoute } from 'astro'
import { createServerClient } from '@supabase/ssr'
import { SUPABASE_URL, SUPABASE_KEY } from "astro:env/server"

export const GET: APIRoute = async ({ cookies, redirect }) => {
  const supabase = createServerClient(
    SUPABASE_URL,
    SUPABASE_KEY,
    {
        auth: {
            flowType: "pkce",
        },
        cookieOptions: {
            domain: '.thunder.so', 
            secure: true,
            sameSite: 'lax'
        },
        cookies: {
            get: (key) => cookies.get(key)?.value,
            set: (key, value, options) => {
                cookies.set(key, value, {
                    ...options,
                    domain: '.thunder.so', // Parent domain to share across subdomains
                    path: '/'
                })
            },
            remove: (key, options) => {
                cookies.delete(key, {
                    ...options,
                    domain: '.thunder.so',
                    path: '/'
                })
            }
        }
    }
  )

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      scopes: '',
      redirectTo: 'https://console.thunder.so/confirm'
    }
  })

  if (error) {
    return new Response(`Authentication error: ${error.message}`, { status: 500 })
  }

  return redirect(data.url, 302)
}