import api from "../modules/api";
import TokenService from "./token.service";

const register = async (email, password, nickname, mbti, profileImg) => {
    return await api.post("/api/players/signup", {
        email,
        password,
        nickname,
        mbti,
        profileImg,
    });
};

const auth = async () => {
    const response = await api.get("/api/players/auth");
    const { email, nickname, playerId } = response.data.user;
    return { email, nickname, playerId };
};

const login = async (email, password) => {
    const response = await api.post("/api/players/signin", {
        email,
        password,
    });

    const accessToken = response.headers["accesstoken"];
    const refreshToken = response.headers["refreshtoken"];
    const token = accessToken.split(" ")[1];
    const { nickname } = response.data.row;

    if (accessToken && refreshToken) {
        TokenService.setAccessToken(accessToken);
        TokenService.setRefreshToken(refreshToken);
    }

    return { nickname, token };
};
const logout = () => {
    TokenService.removeUser("accesstoken");
    TokenService.removeUser("resfreshtoken");
};

const checkEmail = async (email) => {
    return await api.post("api/players/dupEmail", { email });
};

const checkNickname = async (nickname) => {
    return await api.post("api/players/dupNickname", { nickname });
};

const getProfileDetails = async () => {
    try {
        const response = await api.get("api/players/mypage");
        const { email, nickname, profileImg } = response.data.profile;

        return { email, nickname, profileImg };
    } catch (err) {
        console.log(err);
    }
};

const updateProfileDetails = async (profile) => {
    try {
        const response = await api.patch("/players/edit", profile);
        const { email, nickname, profileImg } = response.data.profile;

        return { email, nickname, profileImg };
    } catch (err) {
        console.log(err);
    }
};

const AuthService = {
    register,
    login,
    logout,
    auth,
    checkEmail,
    checkNickname,
    getProfileDetails,
    updateProfileDetails,
};
export default AuthService;
