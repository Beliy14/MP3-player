import axios from "axios"

const authEndpoint = "https://accounts.spotify.com/authorize?"
const clientId = "04c400dc3f6044caa893f6f91204ed5b"
const redirectUrl = "http://localhost:3000"
const scopes = ["user-library-read", "playlist-read-private"]

export const loginEnpoint = `${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUrl}&spoce=${scopes.join(   //   redirect_uri   \(0_0)/
  "%20"
)}&response_type=token&show_dialog=true`



//--- for user [icon, playlists ...] - можем использовать токен где угодно ---//
const apiClient = axios.create({
  baseURL: "https://api.spotify.com/v1/",
})

export const setClientToken = (token) => {
  apiClient.interceptors.request.use(async function (config) {
    config.headers.Authorization = "Bearer " + token
    return config
  })
}

export default apiClient
