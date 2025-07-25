import React from "react";
import { useForm, SubmitHandler, FieldError } from "react-hook-form";
import { FiEdit } from "react-icons/fi";
import {
  Box,
  Button,
  Collapse,
  FormControl,
  FormErrorMessage,
  Input,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useAbout } from "../hook";

// Step 1: Type definition
type AboutHobby = {
  aboutHobby: string;
};

const AboutHobby = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { handleAboutHobby } = useAbout();

  // Step 2: Typed useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AboutHobby>();

  // Step 3: Typed submit function
  const onSubmit: SubmitHandler<AboutHobby> = (data) => {
    handleAboutHobby(data);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "full" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Text fontWeight="semibold">What About Your Hobby?</Text>
        <FiEdit
          onClick={onToggle}
          onMouseOver={(e) => (e.currentTarget.style.cursor = "pointer")}
        />
      </Box>

      {!isOpen && (
        <Text noOfLines={[1, 2, 3]}>
          Example hobby text placeholder...
        </Text>
      )}

      <Collapse in={isOpen} animateOpacity>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <FormControl isInvalid={!!errors.aboutHobby}>
              <Input
                as={Textarea}
                id="aboutHobby"
                size="md"
                placeholder="Describe your hobby"
                {...register("aboutHobby", {
                  required: "Hobby is required",
                  minLength: {
                    value: 20,
                    message: "Minimum 20 characters",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.aboutHobby && (
                  <span>{(errors.aboutHobby as FieldError).message}</span>
                )}
              </FormErrorMessage>
            </FormControl>

            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
                alignItems: "end",
                gap: "1rem",
              }}
            >
              <Button fontSize="18px" colorScheme="blue" type="submit">
                Save
              </Button>
              <Button fontSize="18px" onClick={onToggle}>
                Cancel
              </Button>
            </Box>
          </Box>
        </form>
      </Collapse>
    </Box>
  );
};

export default AboutHobby;
