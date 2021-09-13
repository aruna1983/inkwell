import { Request, Response, NextFunction } from "express";
import axios, { AxiosError, AxiosResponse } from "axios";

export async function getMediaControllers(
  req: Request,
  res: Response,
  next: NextFunction
) {
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
    page: 1,
    perPage: 10,
  };
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
    .then((response: AxiosResponse<{ data: { Page: { media: any[] } } }>) => {
      return res.status(200).send(response.data.data.Page.media);
    })
    .catch((err: AxiosError) => {
      return res.json(err.response);
    });
}
