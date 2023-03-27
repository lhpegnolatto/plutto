import { useUser } from "@supabase/auth-helpers-react";
import { routes } from "constants/routes";
import { useRouter } from "next/router";

export function useHomeHeader() {
  const { user_metadata: userMetadata } = useUser() ?? {};
  const userFirstName =
    ((userMetadata?.full_name as string) || "").split(" ")[0] || "";

  const router = useRouter();

  function handleOnNewRevenueClick() {
    router.push({
      pathname: routes.NEW_TRANSACTION,
      query: { purpose: "revenue" },
    });
  }

  function handleOnNewExpenseClick() {
    router.push({
      pathname: routes.NEW_TRANSACTION,
      query: { purpose: "expense" },
    });
  }

  return {
    userFirstName,
    handleOnNewRevenueClick,
    handleOnNewExpenseClick,
  };
}
