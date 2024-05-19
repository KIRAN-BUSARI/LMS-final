import React from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
// import Layout from "../../Layout/Layout";

const RoomPage = () => {
    const { roomId } = useParams();

    const myMeeting = async (element) => {
        const appID = 140305138;
        const serverSecret = "41a335d4d59e23c0e5e5048cbc8fd7e3";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId, Date.now().toString(), 'WhiteCaps')


        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zp.joinRoom({
            container: element,
            scenario: {
                mode: ZegoUIKitPrebuilt.VideoConference,
            },
        })
    };


    return (
        // <Layout>
            <div className="">
                <div className="room-page">
                    <div ref={myMeeting}></div>
                </div>
            </div>
        // </Layout>
    )
}

export default RoomPage;