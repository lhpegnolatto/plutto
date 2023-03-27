import { useUser } from "@supabase/auth-helpers-react";
import { routes } from "constants/routes";
import { useRouter } from "next/router";

export function useHomeHeader() {
  const { user_metadata: userMetadata } = useUser() ?? {};
  const userFirstName =
    ((userMetadata?.full_name as string) || "").split(" ")[0] || "";

  const router = useRouter();

  function handleOnNewRevenueClick() {
    router.push(`${routes.NEW_TRANSACTION}?purpose=revenue`);
  }

  function handleOnNewExpenseClick() {
    router.push(`${routes.NEW_TRANSACTION}?purpose=expense`);
  }

  return {
    userFirstName,
    handleOnNewRevenueClick,
    handleOnNewExpenseClick,
  };
}
