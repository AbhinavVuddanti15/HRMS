import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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
import { OAuthButtonGroup } from "components/login/OAuthButtonGroup";
import { useRouter } from "next/router";
import { InputControl } from "components/atoms/TextInput";
import { DarkModeSwitch } from "components/DarkModeSwitch";
import { Logo } from "components/login/Logo";
const schema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(8).required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

const SignUp = () => {
  const router = useRouter();

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    setValue("email", "");
    setValue("password", "");
    setValue("confirmPassword", "");
  }, [setValue]);

  const onSubmit = (data: any) => {
    console.log("Sign up data:", data);
    router.push("/login");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container maxW="lg" py={{ base: "12", md: "24" }} px={{ base: "0", sm: "8" }}>
        <DarkModeSwitch sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
        <Stack spacing="8">
          <Stack spacing="6" textAlign="center">
            <Logo/>
            <Heading size={{ base: "xs", md: "sm" }}>Create an account</Heading>
            <Text color="fg.muted">
              Already have an account?{" "}
              <Link as={NextLink} href="/login" color="blue.500" fontWeight="semibold">
                Log in
              </Link>
            </Text>
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
                  label="Email"
                  name="email"
                  control={control}
                  errors={errors}
                  inputProps={{ autoComplete: "email" }}
                />

                <InputControl
                  label="Password"
                  name="password"
                  control={control}
                  errors={errors}
                  inputProps={{ type: "password", autoComplete: "new-password" }}
                />

                <InputControl
                  label="Confirm Password"
                  name="confirmPassword"
                  control={control}
                  errors={errors}
                  inputProps={{ type: "password", autoComplete: "new-password" }}
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
                <OAuthButtonGroup/>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </form>
  );
};

export default SignUp;
