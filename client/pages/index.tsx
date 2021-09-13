import React from "react";
import { Pagination } from "@material-ui/lab";
import Container from "@material-ui/core/Container";
import ImageViews, { IEachImage } from "../src/components/ImageViews";
import axios, { AxiosError, AxiosResponse } from "axios";

const Index: React.FC = () => {
  const [itemData, setItemData] = React.useState<IEachImage[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
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
        setItemData(response.data.data.Page.media);
      })
      .catch((err: AxiosError) => {
        console.log(err.response.data);
      });
  };

  React.useEffect(() => {
    fetchData();
  }, [currentPage]);
  return (
    <Container maxWidth="lg">
      <ImageViews itemData={itemData} />
      <Pagination
        style={{ marginTop: "1em" }}
        count={5}
        color="primary"
        page={currentPage}
        onChange={(_, value) => setCurrentPage(value)}
      />
    </Container>
  );
};
export default Index;
