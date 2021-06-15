import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

type Image = {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
};

type ImageResult = {
  data: {
    data: Image[];
    after: string | null;
  };
};

export default function Home(): JSX.Element {
  const fetchImages = async ({ pageParam = null }): Promise<ImageResult> =>
    api.get('api/images', {
      params: { after: pageParam }
    })
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    // TODO AXIOS REQUEST WITH PARA
    fetchImages
    ,
    // TODO GET AND RETURN NEXT PAGE PARAM
    {
      getNextPageParam: result => result.data.after,
    }
  );

  const formattedData = useMemo(() => {
    // TODO FORMAT AND FLAT DATA ARRAY

    const dataProcessed = data?.pages.map(page => page.data.data).flat()
    return dataProcessed
  }, [data]);

  // TODO RENDER LOADING SCREEN
  if (isLoading) return <Loading />
  // TODO RENDER ERROR SCREEN
  if (isError) return <Error />
  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {/* TODO RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE */
          hasNextPage ? (
            <Button my={6} onClick={() => fetchNextPage()}>
              {isFetchingNextPage ? 'Carregando ...' : 'Carregar mais'}
            </Button>
          ) : (
            ''
          )}

      </Box>
    </>
  );
}
