export interface RegisterAccountPayload {
  email: string
  first_name: string
  last_name: string
  password: string
}

export interface RegisterAccountResponse {
  message: string
}

export class AccountsApiError extends Error {
  readonly details: unknown
  readonly status: number

  constructor(status: number, details: unknown) {
    super('The account request could not be completed.')
    this.name = 'AccountsApiError'
    this.details = details
    this.status = status
  }
}

const registrationEndpoint = '/api/accounts/register/'

/** Creates an account through the public registration API. */
export async function registerAccount(
  payload: RegisterAccountPayload,
): Promise<RegisterAccountResponse> {
  const response = await fetch(registrationEndpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const responseBody: unknown = await response.json().catch(() => null)

  if (!response.ok) {
    throw new AccountsApiError(response.status, responseBody)
  }

  if (
    !responseBody ||
    typeof responseBody !== 'object' ||
    !('message' in responseBody) ||
    typeof responseBody.message !== 'string'
  ) {
    throw new AccountsApiError(response.status, responseBody)
  }

  return { message: responseBody.message }
}
