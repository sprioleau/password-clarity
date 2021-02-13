import { useState } from "react";
import Head from "next/head";
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
	IconButton,
	InputGroup,
	Progress,
	useColorMode,
} from "@chakra-ui/react";
import zxcvbn from "zxcvbn";
import { BiHide, BiShow } from "react-icons/bi";
import { RiSunLine, RiMoonLine } from "react-icons/ri";

const Home = () => {
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState("");
	const [passwordScore, setPasswordScore] = useState("");
	const [suggestions, setSuggestions] = useState("");
	const { colorMode, toggleColorMode } = useColorMode();

	const handleSubmit = (e) => {
		e.preventDefault();
	};

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
		if (!passwordScore || !password) return "5";

		const blurMap = {
			1: "5",
			2: "4",
			3: "3",
			4: "0",
		};

		return blurMap[passwordScore];
	};

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

			<Flex direction="column" justify="center" height="100vh" width="100%" position="relative" overflow="hidden">
				{/* <Flex justify="center" mb={12}>
					<IconButton size="lg" colorScheme="blue" variant="solid" type="submit" onClick={toggleColorMode}>
						{colorMode === "light" ? <RiMoonLine /> : <RiSunLine />}
					</IconButton>
				</Flex> */}
				<Container
					as="section"
					width="100%"
					maxW={600}
					px={8}
					py={12}
					my={12}
					boxShadow="xl"
					p="6"
					rounded="lg"
					/* backdropFilter="blur(5px)" */
					backgroundColor="whiteAlpha.600"
				>
					<Flex
						className="background-image"
						backgroundImage="url(https://picsum.photos/id/1018/1920/1080.webp)"
						/* filter={`blur(${getBlurAmount()})`} */
						position="absolute"
						top="50%"
						left="50%"
						height="100%"
						width="100%"
						transform="translate(-50%, -50%)"
						zIndex="-2"
					/>
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
					<Flex as="main" zIndex="1">
						<form onSubmit={handleSubmit} style={{ width: "100%" }}>
							<Stack spacing={4}>
								<Heading
									as="h1"
									size="3xl"
									textAlign="center"
									bgGradient="linear(to-l, #7928CA, #FF0080)"
									bgClip="text"
									fontWeight="extrabold"
									lineHeight="1.2"
								>
									Password Clarity
								</Heading>

								<FormControl id="password">
									<InputGroup size="lg">
										<Input
											value={password}
											onChange={handleChangePassword}
											type={showPassword ? "text" : "password"}
											autoFocus
										/>
										<Tooltip
											label={`${showPassword ? "Hide" : "Show"} password`}
											fontSize="md"
											placement="bottom"
											hasArrow
										>
											<IconButton
												colorScheme="blue"
												aria-label="Show/Hide Password"
												size="lg"
												icon={showPassword ? <BiHide /> : <BiShow />}
												onClick={togglePasswordVisibility}
											/>
										</Tooltip>
									</InputGroup>
								</FormControl>
								<Progress value={passwordScore * 25} size="xs" colorScheme={getColorScheme()} />

								{suggestions &&
									password.length > 8 &&
									suggestions.map((suggestion) => <Text key={suggestion}>{suggestion}</Text>)}

								<Button size="lg" colorScheme="blue" variant="solid" type="submit">
									Get score
								</Button>
							</Stack>
						</form>
					</Flex>
				</Container>
			</Flex>
		</Flex>
	);
};

export default Home;
