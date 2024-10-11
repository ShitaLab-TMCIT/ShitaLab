import React, { useEffect, useState } from "react";
import {
    Box,
    Text,
    Badge,
    Flex,
    Link,
    Spinner,
    Avatar,
} from "@chakra-ui/react";

interface OwnerData {
    login: string;
    avatar_url: string;
}

interface RepoData {
    name: string;
    description: string;
    stargazers_count: number;
    forks_count: number;
    html_url: string;
    owner: OwnerData;
}

const GitHubRepoInfo: React.FC<{ owner: string; repo: string }> = ({
    owner,
    repo,
}) => {
    const [repoData, setRepoData] = useState<RepoData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRepoData = async () => {
            setLoading(true);
            try {
                const token = import.meta.env.VITE_GITHUB_TOKEN;
                const response = await fetch(
                    `https://api.github.com/repos/${owner}/${repo}`,
                    {
                        headers: {
                            Authorization: `token ${token}`,
                        },
                    }
                );
                const data = await response.json();
                if (data && data.owner) {
                    setRepoData(data);
                }
            } catch (error) {
                console.error("Error fetching repo data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRepoData();
    }, [owner, repo]);

    if (loading) {
        return <Spinner />;
    }

    if (!repoData) {
        return <Text>Error loading repository data.</Text>;
    }

    return (
        <Box
            borderWidth="1px"
            borderRadius="lg"
            borderColor={"gray.600"}
            p={4}
            w={{ base: "80%", md: "500px" }}
            mt={"30px"}
        >
            <Flex alignItems="center" mb={4}>
                <Avatar src={repoData.owner.avatar_url} size="md" mr={4} />
                <Box>
                    <Link href={repoData.html_url} isExternal>
                        <Text fontSize="xl" fontWeight="bold">
                            {repoData.name}
                        </Text>
                    </Link>
                    <Text fontSize="sm" color="gray.500">
                        @{repoData.owner.login}
                    </Text>
                </Box>
            </Flex>
            <Text mt={2} ml={4}>
                {repoData.description}
            </Text>
            <Flex mt={4}>
                <Badge mr={2} colorScheme="yellow">
                    ★ {repoData.stargazers_count}
                </Badge>
                <Badge colorScheme="green">Forks: {repoData.forks_count}</Badge>
            </Flex>
        </Box>
    );
};

export default GitHubRepoInfo;
