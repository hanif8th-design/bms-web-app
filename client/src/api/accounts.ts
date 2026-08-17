export interface RegisterAccountPayload {
  email: string
  first_name: string
  last_name: string
  password: string
}

export interface LoginAccountPayload {
  email: string
  password: string
}

export interface LoginAccountResponse {
  access: string
  refresh: string
  user: {
    email: string
    first_name: string
    id: string
    last_name: string
  }
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

const loginEndpoint = '/api/accounts/login/'
const registrationEndpoint = '/api/accounts/register/'

async function postAccountRequest(
  endpoint: string,
  payload: LoginAccountPayload | RegisterAccountPayload,
): Promise<unknown> {
  const response = await fetch(endpoint, {
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

  return responseBody
}

/** Exchanges email and password for the account API's authentication result. */
export async function loginAccount(
  payload: LoginAccountPayload,
): Promise<LoginAccountResponse> {
  const responseBody = await postAccountRequest(loginEndpoint, payload)

  if (
    !responseBody ||
    typeof responseBody !== 'object' ||
    !('access' in responseBody) ||
    typeof responseBody.access !== 'string' ||
    !('refresh' in responseBody) ||
    typeof responseBody.refresh !== 'string' ||
    !('user' in responseBody) ||
    !responseBody.user ||
    typeof responseBody.user !== 'object'
  ) {
    throw new AccountsApiError(200, responseBody)
  }

  const user = responseBody.user
  if (
    !('id' in user) ||
    typeof user.id !== 'string' ||
    !('email' in user) ||
    typeof user.email !== 'string' ||
    !('first_name' in user) ||
    typeof user.first_name !== 'string' ||
    !('last_name' in user) ||
    typeof user.last_name !== 'string'
  ) {
    throw new AccountsApiError(200, responseBody)
  }

  return {
    access: responseBody.access,
    refresh: responseBody.refresh,
    user: {
      email: user.email,
      first_name: user.first_name,
      id: user.id,
      last_name: user.last_name,
    },
  }
}

/** Creates an account through the public registration API. */
export async function registerAccount(
  payload: RegisterAccountPayload,
): Promise<RegisterAccountResponse> {
  const responseBody = await postAccountRequest(registrationEndpoint, payload)

  if (
    !responseBody ||
    typeof responseBody !== 'object' ||
    !('message' in responseBody) ||
    typeof responseBody.message !== 'string'
  ) {
    throw new AccountsApiError(200, responseBody)
  }

  return { message: responseBody.message }
}
