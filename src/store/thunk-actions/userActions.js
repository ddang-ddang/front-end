import { userActions } from "../slices/userSlice";
import api from "../../modules/api";
import AuthService from "../../services/auth.service";

// 토큰 확인
export const loginCheckAxios = (token, navigate) => {
    return async function (dispatch) {
        try {
            const user = await AuthService.auth();

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
        try {
            await AuthService.register(
                email,
                password,
                nickname,
                mbti,
                profileImg
            );
            dispatch(
                userActions.signup({
                    email,
                    nickname,
                    password,
                    mbti,
                    profileImg,
                })
            );
        } catch (err) {
            console.log(err);
        }
    };
};

// 유저 프로필 상세 가져오기 (현재: 프로필 추가) + 유효성 검사

export const getProfileDetailsAxios = (token, navigate) => {
    return async function (dispatch) {
        try {
            const user = await AuthService.getProfileDetails();

            dispatch(userActions.getProfileDetails(user));
        } catch (err) {
            console.log(err);
            navigate("/signin");
        }
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
