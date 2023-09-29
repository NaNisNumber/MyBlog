import { upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Paper,
  Group,
  PaperProps,
  Anchor,
  Stack,
} from "@mantine/core";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { app } from "../../../firebaseConfig";
// import { GoogleButton, TwitterButton } from "../SocialButtons/SocialButtons";
interface Props {
  type: string;
  toggle: (value?: React.SetStateAction<string> | undefined) => void;
  setDisplayAuthForm: React.Dispatch<React.SetStateAction<boolean>>;
}
export function AuthenticationForm({
  type,
  toggle,
  setDisplayAuthForm,
  ...props
}: Props & PaperProps) {
  const db = getFirestore(app);
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  async function addUserToDb(uid: string, username: string) {
    try {
      await setDoc(doc(db, "users", uid), {
        userName: username,
        favPosts: [],
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  // createUserWithEmailAndPassword(auth, email, password).then(
  //   (userCredential) => {
  //     // Signed in
  //     const user = userCredential.user;
  //     // ...
  //   }
  // );
  // .catch((error) => {
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   // ..
  // });

  return (
    <div className="absolute top-10">
      <Paper radius="none" p="xl" withBorder {...props}>
        <div className="flex justify-center">
          <button
            onClick={() => setDisplayAuthForm(false)}
            className="border-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#fff"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#5a2685"
              className="w-7 h-7 hover:stroke-white hover:fill-purple"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
        <Group grow mb="md" mt="md">
          {/* <GoogleButton radius="xl">Google</GoogleButton>
        <TwitterButton radius="xl">Twitter</TwitterButton> */}
        </Group>

        <form
          onSubmit={form.onSubmit(() => {
            const userName: string = form.values.name;
            const email: string = form.values.email;
            const password: string = form.values.password;
            if (type === "register") {
              createUserWithEmailAndPassword(auth, email, password).then(
                (userCredential) => {
                  // Signed in
                  const user = userCredential.user;
                  const uid: string = user.uid;
                  addUserToDb(uid, userName);
                  setDisplayAuthForm(false);
                }
              );
            } else if (type === "login") {
              signInWithEmailAndPassword(auth, email, password).then(() => {
                // Signed in

                setDisplayAuthForm(false);
                // ...
              });
              // .catch((error) => {
              //   const errorCode = error.code;
              //   const errorMessage = error.message;
              // });
            }
          })}
        >
          <Stack>
            {type === "register" && (
              <TextInput
                label="Name"
                placeholder="Your name"
                value={form.values.name}
                onChange={(event) =>
                  form.setFieldValue("name", event.currentTarget.value)
                }
                radius="md"
              />
            )}

            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email && "Invalid email"}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue("password", event.currentTarget.value)
              }
              error={
                form.errors.password &&
                "Password should include at least 6 characters"
              }
              radius="md"
            />
          </Stack>

          <Group position="apart" mt="xl">
            <Anchor
              component="button"
              type="button"
              color="dimmed"
              onClick={() => toggle()}
              size="xs"
            >
              {type === "register"
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </Anchor>

            <div className="flex justify-center w-full">
              <button className="text-purple font-bold" type="submit">
                {upperFirst(type)}
              </button>
            </div>
          </Group>
        </form>
      </Paper>
    </div>
  );
}
