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

const GitHubRepos: React.FC = () => {
    const [repos, setRepos] = useState<RepoData[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRepoData = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    import.meta.env.BASE_URL + "/GitHubInfos.json"
                );
                const data = await response.json();
                setRepos(data);
            } catch (error) {
                console.error("Error fetching repo data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRepoData();
    }, []);

    if (loading) {
        return <Spinner />;
    }

    if (!repos || repos.length === 0) {
        return <Text>No repository data available.</Text>;
    }

    return (
        <Box>
            {repos.map((repo) => (
                <Box
                    key={repo.name}
                    borderWidth="1px"
                    borderRadius="lg"
                    borderColor={"gray.600"}
                    p={4}
                    w={{ base: "80%", md: "500px" }}
                    mt={"30px"}
                >
                    <Flex alignItems="center" mb={4}>
                        <Avatar src={repo.owner.avatar_url} size="md" mr={4} />
                        <Box>
                            <Link href={repo.html_url} isExternal>
                                <Text fontSize="xl" fontWeight="bold">
                                    {repo.name}
                                </Text>
                            </Link>
                            <Text fontSize="sm" color="gray.500">
                                @{repo.owner.login}
                            </Text>
                        </Box>
                    </Flex>
                    <Text mt={2} ml={4}>
                        {repo.description}
                    </Text>
                    <Flex mt={4}>
                        <Badge mr={2} colorScheme="yellow">
                            ★ {repo.stargazers_count}
                        </Badge>
                        <Badge colorScheme="green">
                            Forks: {repo.forks_count}
                        </Badge>
                    </Flex>
                </Box>
            ))}
        </Box>
    );
};

export default GitHubRepos;
