import { create } from 'axios'
import applyCaseMiddleware from 'axios-case-converter'

import { API_URL } from '@/config/env'

// snake_case (Laravel) <-> camelCase (React), dans les deux sens
export const backendClient = applyCaseMiddleware(
  create({
    baseURL: API_URL,
    headers: { Accept: 'application/json' },
  }),
  // Les en-têtes HTTP (Authorization…) ne doivent pas être convertis
  { ignoreHeaders: true }
)
