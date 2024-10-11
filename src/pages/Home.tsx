import { Text, VStack } from "@chakra-ui/react";
import GitHubRepoInfo from "../components/GitHubRepoInfo";

const Home = () => {
    return (
        <>
            <VStack
                w={"100%"}
                h={"100%"}
                mt={"50px"}
                justify={"center"}
                alignItems={"center"}
            >
                <Text w={"80%"} textAlign={"center"} fontSize={"xl"}>
                    ここはTMCIT 情報通信工学コース
                    <br />
                    設楽研究室HPです
                </Text>

                <GitHubRepoInfo
                    owner="hamuchan214"
                    repo="IEEE802.11simulator"
                />

                <GitHubRepoInfo owner="ryoww" repo="shitalab_homepage" />
            </VStack>
        </>
    );
};

export default Home;
