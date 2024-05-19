import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommunityCard from "../../Components/CommunityCard";
import Layout from '../../Layout/Layout'
import { getAllCommunities } from "../../Redux/communitySlice";

const CommunityList = () => {
    const dispatch = useDispatch();
    const { communitiesData } = useSelector((state) => state.community);

    useEffect(() => {
        (async () => {
            await dispatch(getAllCommunities());
        })();
    }, []);


    return (
        <Layout>
            {/* Community container for displaying the cards */}
            <div className="min-h-[90vh] pt-12 pl-20 flex flex-col flex-wrap gap-10 text-white">
                <h1 className="text-center text-3xl font-semibold">
                    Join the communities made for{" "}
                    <span className="font-bold text-yellow-500">YOU.!</span>
                </h1>

                {/* wrapper for courses card */}
                <div className="mb-10 flex flex-wrap gap-14">
                    {communitiesData?.map((element) => {
                        return <CommunityCard key={element._id} data={element} />;
                    })}
                </div>
            </div>
        </Layout>
    )
}


export default CommunityList;