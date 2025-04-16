import SignUpForm from "../../components/forms/SignUpForm";

function SignUp() {
  return (
    <section className="w-full h-full flex flex-col items-center px-6">
      <h1 className="text-4xl font-bold text-center">Book Tracker</h1>
      <h2 className="text-2xl font-bold text-center">Sign Up</h2>
      <SignUpForm />
    </section>
  );
}

export default SignUp;
