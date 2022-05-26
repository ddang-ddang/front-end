import { userActions } from "../slices/userSlice";
import api from "../../modules/api";
import AuthService from "../../services/auth.service";
import TokenService from "../../services/token.service";

// 토큰 확인
export const loginCheckAxios = (token, navigate) => {
    return async function (dispatch) {
        try {
            const response = await AuthService.auth();
            console.log(response);
            const user = {
                email: response.data.user.email,
                expPoints: response.data.user.expPoints,
                level: response.data.user.level,
                mbti: response.data.user.mbti,
                nickname: response.data.user.nickname,
                playerId: response.data.user.playerId,
                points: response.data.user.points,
                profileImg: response.data.user.profileImg,
            };

            dispatch(userActions.loginCheck({ user, token }));
        } catch (err) {
            navigate("/signin");
        }
    };
};

// 로그인 middleware
export const signinAxios = (email, password, navigate) => {
    return async function (dispatch) {
        let userData = {
            email,
            password,
        };
        try {
            const data = await AuthService.login(email, password);
            const { nickname, token } = data;
            const user = { ...userData, ...nickname };

            dispatch(userActions.signin({ user, token }));
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };
};

// 이메일 중복 확인
export const checkEmailAxios = (email) => {
    return async function (dispatch) {
        try {
            await api.post("/players/dupEmail", { email });
        } catch (err) {
            console.log(err);
        }
    };
};

// 닉네임 중복 확인
export const checkNickname = (nickname) => {
    return async function (dispatch) {
        try {
            await api.post("/players/dupNickname", {
                nickname,
            });
        } catch (err) {
            console.log(err);
        }
    };
};

// 회원 가입 middleware
export const signupAxios = (
    email,
    nickname,
    password,
    mbti,
    profileImg,
    navigate
) => {
    return async function (dispatch) {
        AuthService.register(email, password, nickname, mbti, profileImg)
            .then((res) => {
                console.log(res);
                dispatch(
                    userActions.signup({
                        email,
                        nickname,
                        mbti,
                        profileImg,
                    })
                );
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

// 프로필 수정
export const profileUpdatesAxios = (profile, token, navigate) => {
    return async function (dispatch) {
        try {
            await AuthService.updateProfileDetails(profile);
            const user = {
                nickname: profile.nickname,
                profileImg: profile.profileImg,
            };
            dispatch(userActions.updateProfile({ user }));
        } catch (err) {
            console.log(err);
            navigate("/signin");
        }
    };
};
