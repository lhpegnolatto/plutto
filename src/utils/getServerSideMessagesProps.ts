import { GetServerSidePropsContext } from "next";

export async function getServerSideMessagesProps({
  locale = "pt",
}: GetServerSidePropsContext) {
  return {
    props: {
      messages: (await import(`messages/${locale}.json`)).default,
    },
  };
}
