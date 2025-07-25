import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  Container,
  Divider,
  Heading,
  HStack,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Logo } from "./Logo";
import { useSignUp } from "./hook/useSignUp"; 
import { InputControl } from "components/atoms/TextInput";
import { PasswordField } from "./PasswordField";
import { OAuthButtonGroup } from "./OAuthButtonGroup";
import { DarkModeSwitch } from "components/DarkModeSwitch";

const SignUp = () => {
  const { schema, submit } = useSignUp(); 
  const router = useRouter();

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    setValue("name", "");
    setValue("email", "");
    setValue("password", "");
  }, [setValue]);

  const onSubmit = (data: any) => {
    submit(data, router);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container maxW="lg" py={{ base: "12", md: "24" }} px={{ base: "0", sm: "8" }}>
        <DarkModeSwitch sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
        <Stack spacing="8">
          <Stack spacing="6">
            <Logo />
            <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
              <Heading size={{ base: "xs", md: "sm" }}>Create an account</Heading>
              <Text color="fg.muted">
                Already have an account?{" "}
                <Link as={NextLink} href="/Login" color="blue.500" fontWeight="semibold">
                  Log in
                </Link>
              </Text>
            </Stack>
          </Stack>
          <Box
            py={{ base: "0", sm: "8" }}
            px={{ base: "4", sm: "10" }}
            bg={{ base: "transparent", sm: "bg.surface" }}
            boxShadow={{ base: "none", sm: "md" }}
            borderRadius={{ base: "none", sm: "xl" }}
          >
            <Stack spacing="6">
              <Stack spacing="5">
                <InputControl
                  label="Name"
                  name="name"
                  control={control}
                  errors={errors}
                  inputProps={{ autoComplete: "name" }}
                />
                <InputControl
                  label="Email"
                  name="email"
                  control={control}
                  errors={errors}
                  inputProps={{ autoComplete: "email" }}
                />
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <PasswordField
                      {...field}
                      value={field.value || ""}
                      isInvalid={!!errors.password}
                      errorMessage={errors.password?.message}
                      autoComplete="new-password"
                    />
                  )}
                />
              </Stack>
              <Stack spacing="6">
                <Button type="submit">Sign up</Button>
                <HStack>
                  <Divider />
                  <Text textStyle="sm" whiteSpace="nowrap" color="fg.muted">
                    or continue with
                  </Text>
                  <Divider />
                </HStack>
                <OAuthButtonGroup />
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </form>
  );
};

export default SignUp;
