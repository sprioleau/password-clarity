import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import {
	Input,
	Stack,
	Container,
	Flex,
	FormControl,
	Button,
	Text,
	Heading,
	Tooltip,
	InputGroup,
	Progress,
	InputRightElement,
} from "@chakra-ui/react";
import zxcvbn from "zxcvbn";

const Home = () => {
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState("");
	const [passwordScore, setPasswordScore] = useState(0);
	const [suggestions, setSuggestions] = useState("");
	const [photoId, setPhotoId] = useState(2);

	const handleChangePassword = (e) => {
		setPassword(e.target.value);
		const {
			score,
			feedback: { suggestions },
		} = zxcvbn(password);
		setPasswordScore(score);
		setSuggestions(suggestions);
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const getColorScheme = () => {
		const colorMap = {
			1: "red",
			2: "orange",
			3: "yellow",
			4: "green",
		};

		return colorMap[passwordScore];
	};

	const getBlurAmount = () => {
		const defaultBlur = "10";
		if (!passwordScore || !password) return defaultBlur;

		const blurMap = {
			1: defaultBlur,
			2: "6",
			3: "2",
			4: "0",
		};

		return blurMap[passwordScore];
	};

	useEffect(() => {
		const randomId = (length) => Math.ceil(Math.random() * length);
		setPhotoId(randomId(5));
	}, [setPhotoId]);

	return (
		<Flex as="div" className="app">
			<Head>
				<title>Password Clarity</title>
				<link rel="icon" href="/favicon.ico" />
				<link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
				<link rel="manifest" href="/site.webmanifest" />
				<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
				<meta name="msapplication-TileColor" content="#da532c" />
				<meta name="theme-color" content="#ffffff" />
			</Head>

			<Flex
				direction="column"
				justify="center"
				height="100vh"
				width="100%"
				position="relative"
				overflow="hidden"
				z-index="5"
			>
				<Container
					as="section"
					width="100%"
					maxW={500}
					px={8}
					py={12}
					my={12}
					boxShadow="xl"
					p="6"
					rounded="lg"
					backgroundColor="whiteAlpha.800"
				>
					<Flex as="main" zIndex="1">
						<form style={{ width: "100%" }}>
							<Stack spacing={4}>
								<Heading as="h1" size="lg" textAlign="center" fontWeight="extrabold" lineHeight="0.8">
									Password Clarity
								</Heading>
								<Text as="p" textAlign="center" mb={2}>
									Change the password to clarify the image.
								</Text>

								<FormControl id="password">
									<InputGroup size="md">
										<Input
											autoFocus={true}
											pr="4rem"
											type={showPassword ? "text" : "password"}
											placeholder="Enter password"
											value={password}
											onChange={handleChangePassword}
											focusBorderColor="#179848"
										/>
										<InputRightElement width="4rem">
											<Button
												h="1.75rem"
												width="3rem"
												mr={0}
												size="sm"
												colorScheme="whatsapp"
												onClick={togglePasswordVisibility}
												p={2}
											>
												<Tooltip
													label={`${showPassword ? "Hide" : "Show"} password`}
													fontSize="md"
													placement="bottom"
													hasArrow
												>
													{showPassword ? "Hide" : "Show"}
												</Tooltip>
											</Button>
										</InputRightElement>
									</InputGroup>
								</FormControl>
								<Progress value={password ? passwordScore * 25 : 0} size="xs" colorScheme={getColorScheme()} />

								{suggestions &&
									password.length > 8 &&
									suggestions.map((suggestion) => <Text key={suggestion}>{suggestion}</Text>)}
							</Stack>
						</form>
					</Flex>
				</Container>
			</Flex>
			<Flex zIndex="-1">
				<Flex
					className="blur-filter"
					style={{ backdropFilter: `blur(${getBlurAmount()}px)` }}
					position="absolute"
					top="50%"
					left="50%"
					height="105%"
					width="105%"
					transform="translate(-50%, -50%)"
					zIndex="-1"
				/>
				<Image
					className="background-image"
					src={`/images/${photoId}.jpg`}
					alt="background image"
					layout="fill"
					quality="80"
					objectPosition="center"
					priority
				/>
			</Flex>
		</Flex>
	);
};

export default Home;
