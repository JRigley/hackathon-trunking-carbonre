import { useRouter } from "next/router";
import { useSigninCheck } from "reactfire";
import { Loading } from "./loading";

export default function CheckNotSignedIn({ children }) {
  const { data, status } = useSigninCheck();
  const router = useRouter();

  if (status === 'loading') return <Loading />;

  const { user } = data;
  if (user && user.emailVerified) {
    router.push('/');
    return <></>;
  }

  if (user && !user.emailVerified && router.pathname !== '/validate-email') {
    router.push('/validate-email');
    return <></>;
  }

  return children;
};