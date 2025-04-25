import { useSignIn } from "@clerk/clerk-react";
import { Button } from "./ui/button";

const SignInAuthBtn = () => {
  const { signIn, isLoaded } = useSignIn();

  const signInWithGoogle = () => {
    signIn?.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/auth-callback",
    });
  };

  if (!isLoaded) return null;

  return (
    <Button
      onClick={signInWithGoogle}
      variant="secondary"
      className="text-white border border-zinc-200 px-4 py-2"
    >
      Continue with Google
    </Button>
  );
};

export default SignInAuthBtn;
