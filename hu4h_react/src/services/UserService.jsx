import axios from 'axios'

const USERS_URL_REST_API = 'http://localhost:8080/api/auth/register'
const CONFIRM_URL_REST_API = 'http://localhost:8080/api/auth/confirm'
const LOGIN_URL_REST_API = 'http://localhost:8080/api/auth/login'

export const createUser = (user) => axios.post(USERS_URL_REST_API, user);

export const adminConfirmUser = (user) => axios.post(CONFIRM_URL_REST_API, user)

export const validateLoginUser = (user) => axios.post(LOGIN_URL_REST_API, user)