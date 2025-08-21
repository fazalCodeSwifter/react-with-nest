import { io, Socket } from "socket.io-client";
import axios from "axios";
import { BASE_URL } from "../http/httpRequest";
import { localTokenStorage } from "../../storage/storage";

let socket: Socket | null = null;

const refreshAccessToken = async (token: string | null) => {
    try {
        // const refreshTokenData = localTokenStorage.getRefreshToken()
        if(!token) return { message: "token is missing!" }
        const response = await axios.post(`${BASE_URL}/api/auth/refresh`,{
            refreshToken: token
        }, { withCredentials: true });

        localTokenStorage.tokens.setAccess(response.data?.access_token)
        localTokenStorage.tokens.setRefresh(response.data?.refresh_token)
        const newAccessToken = response.data?.access_token;
        return newAccessToken;
        
    } catch (error: any) {
        console.log("refresh token failed =>", error.response.data.message )
        return null
    }
};


export const initSocket = () => {
    if(socket){
        return socket;
    }
    const token = localTokenStorage.getAccessToken();
    socket = io(BASE_URL,{
        auth: {
            token: token
        },
        transports: ["websocket"],
    });

    socket.on("connect", () => {
        console.log("socket connected",socket?.id);
        
    });

    socket.on("disconnect", (reason: any) => {
        console.log("socket disconnected", reason);
        
    });

    socket.on("unauthorized", async (err: any) => {
        console.log("socket error --->",err);
        
        console.log("socket error", err.message);

        try {
            if(err.message?.includes("your token is expired") || err.message?.includes("unauthorized!")){
                
                const token = localTokenStorage.getRefreshToken()
                 const newToken = await refreshAccessToken(token)
                 
                if(newToken){
                    console.log("REFRSH TOKEN HIT");
                    (socket!.io as any).opts.auth = { token: newToken };
                    socket?.connect()
                }else{
                    console.warn("Refresh token failed, user should logout"); // future in logout if token not valid
                }
            }
        } catch (error) {
            console.log("refreshing token error in socket connection",error);
            
        }
    })

    return socket;
};


export const getSocket = () => {
    return socket;
}
