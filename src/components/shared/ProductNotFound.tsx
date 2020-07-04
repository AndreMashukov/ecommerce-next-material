import React from 'react';
import { useRouter } from 'next/router';

type Props = {
  url: string;
};

export const ProductNotFound: React.FC<Props> = (props: Props) => {
  const { url } = props;

  if (process.browser) {
    const router = useRouter();
    router.push(url);
  }

  return <></>;
};
