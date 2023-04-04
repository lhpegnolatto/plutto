import { GetStaticPropsContext } from "next";

export async function getStaticMessageProps({
  locale = "pt-BR",
}: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`messages/${locale}.json`)).default,
    },
  };
}
