import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "types/supabase.types";
import { getDateTimeInputDefaultValue } from "utils/getDateTimeInputDefaultValue";

type GetTransactionOptions = {
  transactionId: string;
};

export async function getTransaction(
  supabaseClient: SupabaseClient<Database>,
  options: GetTransactionOptions
) {
  const { transactionId } = options;

  if (!transactionId) {
    return {};
  }

  const { data } = await supabaseClient
    .from("transactions")
    .select(
      "id, description, transacted_at, purpose, category_id, payment_method_id, recurrence, amount, frequency, installments"
    )
    .eq("id", transactionId);

  if (data) {
    const transaction = data[0];

    return {
      ...transaction,
      transactedAt: getDateTimeInputDefaultValue(
        new Date(transaction.transacted_at)
      ),
      category: transaction.category_id,
      paymentMethod: transaction.payment_method_id,
      amount: transaction.amount.toString(),
      installments: (transaction.installments || "").toString(),
    };
  }

  return {};
}
