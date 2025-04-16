import SignInForm from "../../components/forms/SignInForm";

function SignIn() {
  return (
    <section className="w-full h-full flex flex-col items-center px-6">
      <h1 className="text-4xl font-bold text-center">Book Tracker</h1>
      <h2 className="text-2xl font-bold text-center">Sign In</h2>
      <SignInForm />
    </section>
  );
}

export default SignIn;
