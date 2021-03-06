import styled from "styled-components";
import CloseIcon from "../../../assets/images/icon/CloseIcon";
import { Grid } from "../../../elements";
import PPimg from "../../../assets/images/png/pp-img.png";
import MobMedium from "../../../assets/images/png/mob-medium.png";
import GameImg from "../../../assets/images/png/game-img.png";
import FeedBubble from "../../../assets/images/png/feed-bubble.png";
import FeedMedium from "../../../assets/images/png/feed-medium.png";
import TimeMedium from "../../../assets/images/png/time-medium.png";
import { getCookie } from "../../../shared/utils";

export default function SelectedQuestCard(Props) {
    const mobIdCheck = getCookie("mobCheck");

    const fragment = (() => {
        switch (Props.type) {
            case "mob":
                return {
                    title: "땅깨비를 이겨라",
                    subTitle: "땅깨비와의 짜릿한 한판승 어때요?",
                    description: (
                        <>
                            땅깨비와 게임에서 승리하세요. 기회는 한 번!
                            <br />
                            승리 시 <span>3,000 포인트</span>를 바로 드려요
                        </>
                    ),
                    icon: "",
                    buttonText: "시작하기",
                };
            case "time":
                return {
                    title: "땅땅! 시간이 없어요",
                    subTitle: "★주목★ 시간 내 도착 시 땅도장 땅땅!",
                    description: (
                        <>
                            제한시간 내에 장소에 도착해서 체크인 해주세요.
                            <br />
                            승리 시 <span>2,000 포인트</span>를 바로 드려요
                        </>
                    ),
                    icon: "",
                    buttonText: "체크인 하기",
                };
            case "feed":
                return {
                    title: "이 땅을 추천합니땅",
                    subTitle: "어떠한 땅인지 자유롭게 적어주세요!",
                    description: (
                        <>
                            이 땅이 어떤 곳인지 자유롭게 리뷰를 남겨주세요.
                            <br />
                            작성만 하면 <span>1,000 포인트</span>를 바로 드려요
                        </>
                    ),
                    icon: "",
                    buttonText: "리뷰 쓰러 가기",
                };
            default:
                return {
                    title: "땅깨비를 이겨라",
                    subTitle: "땅깨비와의 짜릿한 한판승 어때요?",
                    description: (
                        <>
                            땅깨비와 게임에서 승리하세요. 기회는 한 번!
                            <br />
                            승리 시 <span>3,000 포인트</span>를 바로 드려요
                        </>
                    ),
                    icon: "",
                    buttonText: "시작하기",
                };
        }
    })();

    const moveToGame = () => {
        if (Number(mobIdCheck) === Number(Props.id)) {
            console.log(Number(mobIdCheck), Number(Props.id));
            Props.openToast(true);
            return;
        }
        if (Props.isInCircle) {
            Props.selectQuest();
        } else {
            return;
        }
    };

    return (
        <Card>
            <CloseButton onClick={Props.onClick}>
                <CloseIcon />
            </CloseButton>

            <Title>{fragment.title}</Title>
            <SubInfo>{fragment.subTitle}</SubInfo>
            <Grid
                flex
                justifyContent={
                    Props.type === "mob" ? "space-between" : "center"
                }
                alignItems={"center"}
                mystyles={"height: 113px; width: 80%;"}
            >
                {Props.type === "mob" && (
                    <>
                        <MobImg src={MobMedium} alt={"mob"} />
                        <MobImg src={GameImg} alt={"game"} />
                        <MobImg src={PPimg} alt={"pp"} />
                    </>
                )}
                {Props.type === "feed" && (
                    <>
                        <FeedImg src={FeedMedium} alt={"feed"} />
                        <FeedBalloon>
                            <img src={FeedBubble} alt={"balloon"} />
                            <p>Review!</p>
                        </FeedBalloon>
                    </>
                )}
                {Props.type === "time" && (
                    <TimeImg>
                        <img src={TimeMedium} alt={"time"} />
                    </TimeImg>
                )}
            </Grid>
            <SubInfo>{fragment.description}</SubInfo>
            <CardButton
                style={Props.isInCircle ? {} : { background: "#CDCDCD" }}
                onClick={moveToGame}
            >
                <p>{fragment.buttonText}</p>
            </CardButton>
        </Card>
    );
}

const Card = styled.div`
    position: relative;
    width: 95%;
    max-width: 360px;
    height: 360px;
    margin: auto;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 1px 1px 3px rgba(137, 142, 139, 0.7);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title = styled.div`
    font-size: 24px;
    font-weight: 700;
    line-height: 1.15;
    margin: 54px 0 8px;
`;

const SubInfo = styled.div`
    font-size: 12px;
    line-height: 1.15;
    text-align: center;
    & span {
        font-weight: 700;
    }
`;

const CardButton = styled.div`
    width: 75%;
    height: 40px;
    background: #5deb85;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    & p {
        font-size: 16px;
        font-weight: 700;
        line-height: 1.15;
        text-align: center;
    }
`;

const CloseButton = styled.div`
    position: absolute;
    top: 24px;
    right: 24px;
`;

const MobImg = styled.img`
    width: 48px;
    height: 48px;
    object-fit: cover;
`;
const FeedImg = styled.img`
    height: 48px;
    object-fit: contain;
`;
const FeedBalloon = styled.div`
    position: relative;
    width: 100px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    & img {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 9;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    & p {
        position: relative;
        z-index: 10;
        font-size: 12px;
        line-height: 1.15;
        color: #fff;
    }
`;

const TimeImg = styled.div`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    & img {
        width: 48px;
        height: 48px;
        object-fit: cover;
    }
`;
