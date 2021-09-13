import React from "react";
import { Pagination } from "@material-ui/lab";
import Container from "@material-ui/core/Container";
import ImageViews, { IEachImage } from "../src/components/ImageViews";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentPage, selectImages, setCurrentPage, setImages } from "../redux/anime/animeSlice";

const Index: React.FC = () => {
  const currentPage = useSelector(selectCurrentPage);
  const itemData = useSelector(selectImages(currentPage));
  const dispatch = useDispatch();
  const query = `
  query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
      }
      media( type: ANIME, sort: FAVOURITES_DESC) {
        id
        title {
          romaji
        }
        coverImage{
          large
        }
        description
      }
    }
  }
   `;

  let variables = {
    page: currentPage,
    perPage: 10,
  };
  const fetchData = async () => {
    await axios
      .post(
        `https://graphql.anilist.co`,
        {
          query,
          variables,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((response: AxiosResponse<{
        data: {
          Page: {
            media: IEachImage[]
          }
        }
      }>) => {
        dispatch(setImages({key: currentPage, value: response.data.data.Page.media}))
      })
      .catch((err: AxiosError) => {
        console.log(err.response.data);
      });
  };

  React.useEffect(() => {
    if(itemData.length === 0) {
      fetchData()
    }
  }, [currentPage]);
  return (
    <Container maxWidth="lg">
      <ImageViews itemData={itemData} />
      <Pagination
        style={{ marginTop: "1em" }}
        count={3}
        color="primary"
        page={currentPage}
        onChange={(_, value) => dispatch(setCurrentPage(value))}
      />
    </Container>
  );
};
export default Index;
