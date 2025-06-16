import { SignIn } from "@/components/SignIn";
import { auth } from "@/auth";
export default async function Page() {
  const session=await auth();
  console.log(session)
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <SignIn />
    </div>
  );
}
